var express = require('express');
const { Company, Notice } = require('../models');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('군나영 배고프다');
});

module.exports = router;
