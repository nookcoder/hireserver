var express = require('express');
var path = require('path');
var Company = require('../models/company');

var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/aaaaa', async (req, res, next) => {
//     //res.sendFile(path.join(__dirname, '../public', 'index.html'))
//     try {
//         const companys = await Company.findAll();
//         res.render('sequelize', { companys });
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

module.exports = router;
