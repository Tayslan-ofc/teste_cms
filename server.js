const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let dados = require('./data.json');

// Rota para visualizar o site
app.get('/', (req, res) => {
  res.render('index', { dados });
});

// Rota do painel CMS
app.get('/admin', (req, res) => {
  res.render('admin', { dados });
});

// Salvar alterações do CMS
app.post('/salvar', (req, res) => {
  const { titulo, descricao } = req.body;
  dados.titulo = titulo;
  dados.descricao = descricao;

  fs.writeFileSync('data.json', JSON.stringify(dados, null, 2));
  res.redirect('/admin');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
