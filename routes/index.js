'use strict'
const express = require('express');
const router = express.Router();
const {wikiRouter} = require('./wiki');
const {userRouter} = require('./user');
const Client = require('pg').Client;
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', (req, res, next) => {
  Page.findAll()
  .then(rows => {
    res.render('index', {pages: rows});
  })

});

module.exports = {router};
