import express from "express";
import cookieParser from "cookie-parser";
import fs from "fs";
import JSON5 from "json5";
import { insertToProdcuts, insertProductReview } from "../persist.js";

const PRODUCTS_PATH = "backend/data/products.json5";

const productRouter = express.Router();
productRouter.use(express.json());
productRouter.use(cookieParser());

productRouter.delete("/product/:productId", (req, res) => {
  const productId = req.params.productId;
  console.log(productId);

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
  const {
    name,
    category,
    image,
    price,
    brand,
    countInStock,
    description,
  } = req.body;
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

export default productRouter;
