'use strict'
const express = require('express');
const router = express.Router();
const {wikiRouter} = require('./wiki');
const {userRouter} = require('./user');
const Client = require('pg').Client;

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = {router};
