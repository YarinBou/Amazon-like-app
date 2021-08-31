import express from "express";
import cookieParser from "cookie-parser";
import fs from "fs";
import JSON5 from "json5";
import { insertToProdcuts, insertProductReview, isUserAdmin } from "../persist.js";

const PRODUCTS_PATH = "backend/data/products.json5";

const productRouter = express.Router();
productRouter.use(express.json());
productRouter.use(cookieParser());

export function isAdmin(req){
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        return false;
    }
    return isUserAdmin(loginCookie.username);
}

productRouter.delete("/product/:productId", (req, res) => {
    const productId = req.params.productId;
    const isUserAdmin = isAdmin(req);
    if(!isUserAdmin){
        res.status(401).send({
            validationError: "You are not an admin!.",
        });
    }
    const allProducts = JSON5.parse(fs.readFileSync(PRODUCTS_PATH));

    for (const idx in allProducts) {
        if (allProducts[idx]._id == productId) {
            allProducts.splice(idx, 1);
            fs.writeFileSync(PRODUCTS_PATH, JSON5.stringify(allProducts, null, 2));
            res.status(200).send();
            return;
        }
    }
    res.status(409).send({
        validationError: "Product doesn't exits.",
    });
    return;
});

productRouter.post("/api/addReview", (req, res) => {
    const { rating, text, productId } = req.body;

    try {
        insertProductReview(rating, text, productId);
    } catch (error) {
        res.status(500).send({
            validationError: `Internal Server Error: ${error}`,
        });
    }
    res.status(200).send();
    return;
});

productRouter.post("/api/admin/add", (req, res) => {
    const { name, category, image, price, brand, countInStock, description } =
    req.body;
    const isUserAdmin = isAdmin(req);
    if(!isUserAdmin){
        res.status(401).send({
            validationError: "You are not an admin!.",
        });
    }
    try {
        insertToProdcuts(
            name,
            category,
            image,
            price,
            brand,
            countInStock,
            description
        );
    } catch (error) {
        res.status(500).send({
            validationError: `Internal Server Error: ${error}`,
        });
    }
    res.status(200).send({ status: "Product was added successfully" });
    return;
});

productRouter.get("/api/authenticateUser", (req, res) => {
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        res.status(401).send({
            validationError: "No cookie",
        });
        return;
    }
    const isAdmin = isUserAdmin(loginCookie.username);
    res.status(200).send(isAdmin);
});

export default productRouter;