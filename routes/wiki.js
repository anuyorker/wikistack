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


  // var title = req.body.title;
  // var content = req.body.content;


  // const page = Page.build({
  //   title: title,
  //   content: content
  // });

  // page.save()
  //   .then(page => {
  //     res.redirect(page.route);
  //  })
  //   .catch(next);


  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function (values) {

    const user = values[0];

    const page = Page.build({
      title: req.body.title,
      content: req.body.content,
      name: user
    });
    return page;
  })
  .then(page => {
    page.setAuthor(user);
  })
  .then(page => {
    page.save();
  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);

});

wikiRouter.get('/add', function(req, res, next) {
  // res.send('response to GET request to /wiki/add');
  res.render('addpage');
});

wikiRouter.get('/:urlTitle', function (req, res, next){
  // console.log(req.params.urlTitle);
  // res.send(req.params.urlTitle);

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(foundPage => {

    res.render('wikipage',  {
      title: foundPage.title,
      content: foundPage.content
    });

    // res.json(foundPage);
  })
  .catch(next)

});

module.exports = {wikiRouter};
