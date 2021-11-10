var express = require('express');
const { Company, Notice, Recruitment } = require('../models');

var router = express.Router();

router.post('/check/:id', async (req, res, next) => {
        const recruitment = await Recruitment.findAll({
                where: { 'company_id': req.body.userId },
        });
        console.log(recruitment);
        res.json(recruitment);
});

router.post('/input', async (req, res, next) => {
  const recruitmentInput = await Recruitment.create({
    'company_id': req.body.userId,
    'title': req.body.postingForm.title,
    'category': req.body.postingForm.category,
    'type': req.body.postingForm.type,
    'start_date': req.body.postingForm.start,
    'end_date': req.body.postingForm.end,
    'division_infomation': req.body.postingContent.areaRecruitment,
    'work_infomation': req.body.postingContent.businessContent,
    'qualification_infomation': req.body.postingContent.qualifications,
    'submit_infomation': req.body.postingContent.document,
    'help_infomation': req.body.postingContent.help,
  })
  console.log(recruitmentInput);
  res.json(recruitmentInput);
}
);

module.exports = router;
