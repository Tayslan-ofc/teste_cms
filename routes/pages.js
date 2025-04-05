const express = require('express');
const router = express.Router();
const Page = require('../models/Page');

// Listar páginas
router.get('/', async (req, res) => {
  const pages = await Page.find().sort({ createdAt: -1 });
  res.render('index', { pages });
});

// Formulário de nova página
router.get('/add', (req, res) => {
  res.render('add');
});

// Salvar nova página
router.post('/add', async (req, res) => {
  const { title, content } = req.body;
  await Page.create({ title, content });
  res.redirect('/');
});

module.exports = router;
