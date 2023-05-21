const express = require('express');
const fs = require('fs');
const replaceNewsTemplate = require('./modules/replace_news_template');

const app = express();

// Шаблоны
const tempMain = fs.readFileSync(`${__dirname}/templates/template-main.html`, 'utf-8');
const tempBhScene = fs.readFileSync(`${__dirname}/templates/template-behind-scene.html`, 'utf-8');

const tempNews = fs.readFileSync(`${__dirname}/templates/template-news.html`, 'utf-8');
const tempNewsCard = fs.readFileSync(`${__dirname}/templates/template-news-card.html`, 'utf-8');
const tempNewsPage = fs.readFileSync(`${__dirname}/templates/template-news-page.html`, 'utf-8');

const tempEnemis = fs.readFileSync(`${__dirname}/templates/template-enemies.html`, 'utf-8');
const tempEnemiesCard = fs.readFileSync(`${__dirname}/templates/template-enemies-card.html`, 'utf-8');
const tempEnemiesPage = fs.readFileSync(`${__dirname}/templates/template-enemies-page.html`, 'utf-8');

const dataNews = fs.readFileSync(`${__dirname}/data/news_Data.json`, 'utf-8');
const dataNewsObj = JSON.parse(dataNews); //Array of product objects

const dataEnemies = fs.readFileSync(`${__dirname}/data/enemy_Data.json`, 'utf-8');
const dataEnemiesObj = JSON.parse(dataEnemies); //Array of product objects

// Подключаем источник всех изображение, стилей, скриптов
app.use(express.static(__dirname + '/public'));

//Главная страница
app.get('/', function (request, response) {
  const output = tempMain;
  response.send(output);
});

//Новости
app.get('/news', function (request, response) {
  const cardsHtml = dataNewsObj.map((el) => replaceNewsTemplate(tempNewsCard, el)).join(''); //цикл
  const output = tempNews.replace('{%NEWS%}', cardsHtml);
  response.send(output);
});

//Страница с новостью
app.get('/news-page', function (request, response) {
  const product = dataNewsObj[request.query['id']];

  const output = replaceNewsTemplate(tempNewsPage, product);
  response.send(output);
});

//Закулисье
app.get('/behind_scene', function (request, response) {
  const output = tempBhScene;
  response.send(output);
});

//Враги
app.get('/enemies', function (request, response) {
  const cardsHtml = dataEnemiesObj.map((el) => replaceNewsTemplate(tempEnemiesCard, el)).join(''); //loop
  const output = tempEnemis.replace('{%CARDS%}', cardsHtml);
  response.send(output);
});

//Страница с врагом
app.get('/enemies-page', function (request, response) {
  const product = dataEnemiesObj[request.query['id']];

  const output = replaceNewsTemplate(tempEnemiesPage, product);
  response.send(output);
});

app.listen(3000);
