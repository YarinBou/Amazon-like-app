import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import {
  getAllProducts,
} from './persist.js';

dotenv.config();

const app = express();

app.use(userRouter);
app.use(productRouter);
app.get('/api/products/:id', (req, res) => {
  const data = getAllProducts();
  const product = data.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.get("/api/products", (req, res) => {
    const data = getAllProducts();
    res.send(data);
});

app.get("/", (req, res) => {
    res.send("Server is ready");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});