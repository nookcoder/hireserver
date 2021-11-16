const express = require('express');
const {Resume} = require('../models');

const router = express.Router();

router.post('/', async (req,res,next)=>{
    try{
        const resume = await Resume.create({
            'name': req.body.applyData.name,
            'birth': req.body.applyData.birth,
            'gender':req.body.applyData.gender,
            'email_id':req.body.applyData.email,
            'email_address':req.body.applyData.emailAddress,
            'phone_number':req.body.applyData.phoneNumber,
            'phone_number2':req.body.applyData.phoneNumber2,
            'motivate':req.body.applyData.motivate,
            'recruitments_id':req.body.applyData.recrumentId,
            'company_id':req.body.applyData.id,
        });
        res.send("등록성공");
    }catch(err){
        console.log(err);
    }
})

module.exports = router;