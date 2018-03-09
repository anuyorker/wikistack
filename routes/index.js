'use strict'
const express = require('express');
const router = express.Router();

const Client = require('pg').Client;

module.exports = io => {

  router.get('/', (req, res, next) => {
    res.render('index');
  });

  return router;
};
