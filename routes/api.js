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
/*  
// encryption 
  let  cipher = crypto.createCipher('aes192', 'key');
  cipher.update(user.password, 'utf8', 'base64');
  let cipheredOutput = cipher.final('base64');
  user.password = cipheredOutput;

  //복호화
  //decryption
  let decipher = crypto.createDecipher('aes192', 'key');
  decipher.update(cipheredOutput, 'base64', 'utf8');
  let decipheredOutput = decipher.final('utf8');
*/