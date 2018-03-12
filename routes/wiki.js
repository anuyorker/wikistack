'use strict'
const express = require('express');
const wikiRouter = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

wikiRouter.get('/', function(req, res, next) {
  // res.send('response to GET request to /wiki/');
  res.redirect('/');
});

wikiRouter.post('/', function(req, res, next) {
  // res.send('response to POST request to /wiki/');
  // console.log(res.json(req.body));
  // res.json(req.body);
  var title = req.body.title;
  var content = req.body.content;

  const page = Page.build({
    title: title,
    content: content
  });
  page.save().then(page => {
    res.json(page);
  });
  // res.redirect('/');
});

wikiRouter.get('/add', function(req, res, next) {
  // res.send('response to GET request to /wiki/add');
  res.render('addpage');
});

wikiRouter.get('/:urlTitle', function (req, res, next){
  // console.log(req.params.urlTitle);
  // res.send(req.params.urlTitle);



  res.render('wikipage',
    Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      }
    })
    .then(foundPage => res.json(foundPage))
    .catch(next)
  );


});

module.exports = {wikiRouter};
