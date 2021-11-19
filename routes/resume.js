const express = require('express');
const {Resume} = require('../models');

const router = express.Router();

router.get('/:company/:recruitment',async(req,res,next)=>{
    console.log(req.params);
    try{
        const applicants = await Resume.findAll({
            where:{
                'company_id':req.params.company,
                'recruitments_id':req.params.recruitment
            }
        });
        console.log(applicants);
        res.send(applicants);
    } catch(err){
        console.log(err);
    }
})

router.get('/:recruitment_id',async(req,res,next)=>{
    console.log(req.params);
    try{
        const applicants = await Resume.findAll({
            where:{
                'recruitments_id':req.params.recruitment_id
            }
        });
        console.log(applicants);
        res.send(applicants);
    } catch(err){
        console.log(err);
    }
})


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
});

router.delete('/:companyId/:recruitmentId',async(req,res,netx)=>{
    try{
        await Resume.destroy({
            where:{
                "company_id" : req.params.companyId,
                "recruitments_id" : req.params.recruitmentId 
            }
        });
        res.send("제거 성공");
    }catch(err){
        console.log(err);
    }
})

module.exports = router;