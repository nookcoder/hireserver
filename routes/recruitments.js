var express = require('express');
const { render } = require('../app');
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
    'company_id': req.body.recruitmentData.id,
    'title': req.body.recruitmentData.title, // 제목
    'career': req.body.recruitmentData.category, // 신입/경력
    'kind': req.body.recruitmentData.type, // 모집분야
    'date': req.body.recruitmentData.start, // 시작일
    'end_date': req.body.recruitmentData.end, // 종료일
    'division_information': req.body.recruitmentData.areaRecruitment, // 공채/수시
    'work_information': req.body.recruitmentData.businessContent,
    'qualification_information': req.body.recruitmentData.qualifications,
    'submit_information': req.body.recruitmentData.document,
    'help_information': req.body.recruitmentData.help,
  })
  console.log(recruitmentInput);
  res.json({
    success: true,
    message: "등록이 완료되었습니다.",
    recruitmentInput
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const recruitmenTitle = await Recruitment.findAll(
      { where: { company_id: req.params.id } });
    console.log(recruitmenTitle);
    res.json(recruitmenTitle);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/title/:titleid', async (req, res, next) => {
  try {
    const recruitmentId = await Recruitment.findOne(
      { where: { id: req.params.titleid } });
    console.log(recruitmentId);
    res.json(recruitmentId);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// const secretKey = ''; // 아까 token 만들때 썼던 secretkey
// const router = (req, res) => {
//   const token = req.headers['x-access-token'] || req.query.token;
//   jwt.verify(token, secretKey, 
//     function(err, decoded){
//       console.log(err) // 유효하지 않은 토큰
//       console.log(decoded) // 유효한 토큰, 유저 정보 Object 반환
//     }
// }

module.exports = router;
