const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('./productos.json', 'utf8');
    const products = JSON.parse(data);
    res.json({ products });
  } catch (error) {
    console.error('Error Interno del Servidor', error);
    res.status(500).json({ error: 'Error Interno del Servidor' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      res.status(400).json({ error: 'ID de producto no válido' });
      return;
    }

    const data = await fs.readFile('./productos.json', 'utf8');
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error Interno del Servidor', error);
    res.status(500).json({ error: 'Error Interno del Servidor' });
  }
});

module.exports = router;
