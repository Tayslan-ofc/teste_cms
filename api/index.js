const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

const viewsDir = path.join(__dirname, '..', 'views');
const publicDir = path.join(__dirname, '..', 'public');
const dataPath = path.join(__dirname, '..', 'data.json');

app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', viewsDir);

let dados = require(dataPath);

app.get('/', (req, res) => {
  res.render('index', { dados });
});

app.get('/admin', (req, res) => {
  res.render('admin', { dados });
});

app.post('/salvar', (req, res) => {
  const { titulo, descricao } = req.body;
  dados.titulo = titulo;
  dados.descricao = descricao;

  fs.writeFileSync(dataPath, JSON.stringify(dados, null, 2));
  res.redirect('/admin');
});

module.exports = app;
