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
                'recruitments_id':req.params.recruitment_id,
                'pass' : 1
            }
        });
        console.log(applicants);
        res.send(applicants);
    } catch(err){
        console.log(err);
    }
});



// 면접자 면접 업데이트
router.patch('/interview/update/:id', (req, res) => {
    for (var item of req.body.user){
        Resume.update({
            'interview_group': item.interview_group,
            'interview_location': item.interview_location,
            'interview_date': item.interview_date,
            'interview_time': item.interview_time,
        },
        { where: { id: item.id } });
    }
    res.send("success")
});

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
            'pass': 0
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
});

router.patch('/:id',async(req,res)=>{
    const NOT_YET = 0;
    const PASS = 1;
    const NONE_PASS = 2; 
    try{
        switch (req.body.result) {
            case NOT_YET:
                await Resume.update(
                    {'pass' : NOT_YET },
                    {where:{"id" : req.params.id}
                });
                break;
            case PASS:
                await Resume.update(
                    {'pass' : PASS },
                    {where:{"id" : req.params.id}
                });
                break;
            case NONE_PASS:
                await Resume.update(
                    {'pass' : NONE_PASS },
                    {where:{"id" : req.params.id}
                });   
                break;         
            default:
                break;
        }
        res.send("성공");
    }catch(err){
        console.log(err);
    }
});

module.exports = router;