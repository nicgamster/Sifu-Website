const { debug, log } = require('console');
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const express = require('express');
const replaceNewsTemplate = require('./modules/replace_news_template');

/////////////////////////////////
//FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated in ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('File has been written');

//             })
//         });
//     });
// });

/////////////////////////////////
//SERVER
const app = express();
app.use(express.static('public'));

const tempMain = fs.readFileSync(`${__dirname}/templates/template-main.html`, 'utf-8');

const tempNews = fs.readFileSync(`${__dirname}/templates/template-news.html`, 'utf-8');
const tempNewsCard = fs.readFileSync(`${__dirname}/templates/template-news-card.html`, 'utf-8');

// const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const dataNews = fs.readFileSync(`${__dirname}/data/news_Data.json`, 'utf-8');
const dataNewsObj = JSON.parse(dataNews); //Array of product objects

// const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true); //true so query transfrom in object. pathname

  console.log(pathname);

  //Overview page
  if (pathname == '/' || pathname == '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    //const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join(''); //loop
    //const cardsHtml =
    //const output = tempOverview.replace('{%PRODUCTS_CARD%}', cardsHtml);
    //res.end(output);
    res.end('<h1>Monoter</h1>');

    //Product page
  } else if (pathname == '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];

    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  //API
  else if (pathname == '/api') {
    //res.writeHead(200, {'Content-type': 'application/json'});
    res.end(data);
  }

  //Main
  else if (pathname == '/main') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const output = tempMain;

    res.end(output);
  }

  //News
  else if (pathname == '/news') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = dataNewsObj.map((el) => replaceNewsTemplate(tempNewsCard, el)).join(''); //loop
    const output = tempNews.replace('{%NEWS%}', cardsHtml);

    res.end(output);
  }

  //NotFound
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page cannot be found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests');
});
