import express from "express";
import cookieParser from "cookie-parser";
import fs from "fs";
import JSON5 from "json5";
const PRODUCTS_PATH = "backend/data/products.json5"


const productRouter = express.Router();
productRouter.use(express.json());
productRouter.use(cookieParser());

productRouter.delete("/product/:productId", (req, res) => {
  const productId = req.params.productId;
  console.log(productId);

  const allProducts = JSON5.parse(fs.readFileSync(PRODUCTS_PATH));

  for (const idx in allProducts) {
    if (allProducts[idx]._id == productId) {
      console.log("## got here");
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

  if (findUser(username) != null) {
    res.status(409).send({
      validationError: "User already exists",
    });
    return;
  }
  const encryptedPassword = req.body.password;
  if (encryptedPassword.length <= 6) {
    res.status(400).send({
      validationError: "Password is too short",
    });
    return;
  }
});

export default productRouter;