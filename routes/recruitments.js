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
    'company_id': "1",
    'title': req.body.recruitmentData.title,
    'category': req.body.recruitmentData.category,
    'type': req.body.recruitmentData.type,
    'start_date': req.body.recruitmentData.start,
    'end_date': req.body.recruitmentData.end,
    'division_infomation': req.body.recruitmentData.areaRecruitment,
    'work_infomation': req.body.recruitmentData.businessContent,
    'qualification_infomation': req.body.recruitmentData.qualifications,
    'submit_infomation': req.body.recruitmentData.document,
    'help_infomation': req.body.recruitmentData.help,
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

router.get('/list', async (req, res) => {
  try {
    const recruitment = await Recruitment.findOne({
      where: { id: req.id },
    });
    res.json(recruitment)
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

// router.get('/list', async (req, res) => {
//   try {
//       const recruitmentListOne = await Recruitment.findOne({
//     where: {
//       'company_id': 1,
//     }
//   });
//   res.json(recruitmentListOne);
//   } catch (err) {
//         console.error(err);
//         next(err);
//   }
// }
// );

// router.get('/list', (req, res) => {
//   const recruitmentListOne = Recruitment.findAll({ where: {'company_id': 1}})
//     .then(result => {
//       console.log("----------" + recruitmentListOne);
//       console.log("----------" + result);
//       res.send(result)
//     })
//   .catch(err => {console.log(err.data);})
  // try {
  //   const recruitmentList = await Recruitment.findAll({
  //     where: { 'company_id': req.body.id }
  //   });
  //   console.log(recruitmentList);
  //   res.send(recruitmentList)
  // } catch (err) {
  //   console.error(err);
  //   next(err);
  // }
// });

module.exports = router;


      // .then(res => {
      //   alert(JSON.stringify(res))
      //     console.log(res);
      //     console.log(res.data);
      //     console.log(res.data.type);
      //   if(res.data){
      //   }
      //   else{
      //   }
      // });