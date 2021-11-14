const { Console } = require('console');
var express = require('express');
var path = require('path');
var Company = require('../models/company');

var router = express.Router();

router.post('/company/signup', async (req, res, next) => {
    const signupUser = await Company.create({ company_id: req.body.id})
    try {
        // company_id: req.body.id;
        // company_pw: req.body.password;
        const companysignup = await Company.findAll({
            where: {
                company_id: req.body.id,
                company_pw: req.body.password
            }
        });
        console.log(companysignup);
        res.json(companysignup);
    } catch (err) {
        console.error(err);
        next(err);
    }
}
);

module.exports = router;
