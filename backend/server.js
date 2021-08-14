import express from 'express';
import fs from 'fs';
import JSON5 from 'json5';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';

dotenv.config();

const app = express();

app.use(userRouter);
app.get('/api/products/:id', (req, res) => {
  // if (!is_authenticated(req)){
  //   res.redirect('/login');
  //   return;
  // }
  const data = JSON5.parse(fs.readFileSync('backend/data/products.json5'));
  const product = data.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.get('/api/products', (req, res) => {
  // if (!is_authenticated(req)){
  //   res.redirect('/login');
  //   return;
  // }
  const data = JSON5.parse(fs.readFileSync('backend/data/products.json5'));
  res.send(data);
});

app.post('/api/products', (req, res) => {
  // if (!is_authenticated(req)){
  //   res.redirect('/login');
  //   return;
  // }
  fd = fs.openSync('backend/data/products.json5', mode='w');
  try
  {
    const data = JSON5.parse(fs.readFileSync(fd));
    data.append({'id': 5});
    fs.writeFileSync(fd, data);
  }
  finally{
    fs.closeSync(fd);
  }
});

app.get('/', (req, res) => {
  res.send('Server is ready');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});