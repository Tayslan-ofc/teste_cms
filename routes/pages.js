const express = require('express');
const router = express.Router();
const page = require('../models/page');

// Listar páginas
router.get('/', async (req, res) => {
  const pages = await page.find().sort({ createdAt: -1 });
  res.render('index', { pages });
});

// Formulário de nova página
router.get('/add', (req, res) => {
  res.render('add');
});

// Salvar nova página
router.post('/add', async (req, res) => {
  const { title, content } = req.body;
  await page.create({ title, content });
  res.redirect('/');
});

module.exports = router;
