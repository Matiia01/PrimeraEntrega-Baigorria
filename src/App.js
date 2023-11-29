const express = require('express');
const cors = require('cors');
const productRouter = require('./productRouter');
const ProductManager = require('./ProductManager');
const path = require('path');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use('/api/products', productRouter);

const productManager = new ProductManager(path.join(__dirname, 'src', 'productos.json'));

app.get('/', (req, res) => {
  res.send('Bienvenidos al Servidor de e-commerce!');
});

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
