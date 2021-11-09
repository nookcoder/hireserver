var express = require('express');
const Company = require('../models/company');
const Notice = require('../models/notice');
const Recruitment = require('../models/recruitment');

var router = express.Router();

// company id로 값 불러오기
router.get('/:id', async (req, res, next) => {
  try {
    const company = await Company.findOne({where: { id: req.params.id }});
    console.log(company);
    res.json(company);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 해당 company id에 따른 notices들
router.get('/:company_id/notices', async (req, res, next) => {
    try {
        const notices = await Notice.findAll({
                where: { company_id: req.params.company_id },
        });
        console.log(notices);
        res.json(notices);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 해당 company id에 따른 채용 공고 정보
router.get('/:company_id/recruitments', async (req, res, next) => {
    try {
        const recruitments = await Recruitment.findAll({
                where: { company_id: req.params.company_id },
        });
        console.log(recruitments);
        res.json(recruitments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 회원가입 시, 아이디 중복확인
router.post('/signup/check', async (req, res, next) => {
  const signupCheckID = await Company.findOne({
    where: {
      'company_id': req.body.user_id,
    }
  });
  res.json(signupCheckID);
}
);

// 회원가입 확인
router.post('/signup', async (req, res, next) => {
  const signupCompany = await Company.create({
    'company_id': req.body.user.id,
    'company_pw': req.body.user.password,
    'company_name': req.body.user.name,
    'company_email': req.body.user.email,
  })
  console.log(signupCompany);
  res.json(signupCompany);
}
);

// 로그인 확인
router.post('/login', async (req, res, next) => {
  const loginCompany = await Company.findOne({
    where: {'company_id': req.body.loginForm.id }
  })
  // 해당 아이디가 없을 경우
  if (!loginCompany) {
    res.json({
        loginSuccess: false,
        message: "존재하지 않는 아이디입니다.",
      });
  }
  else {
    // 아이디 있는데, 비밀번호가 같음
    if (loginCompany.company_pw == req.body.loginForm.password) {
      res.json({
        loginSuccess: true,
        message: "로그인 됨용~",
      });
      // 토큰을 원하는 나0
      // loginCompany.generateToken((err, loginCompany) => {
      //       if (err) res.status(400).send(err);
      //       else {
      //         res.cookie("x_auth", loginCompany.token)
      //           .status(200)
      //           .json({ loginSuccess: true, 'company_id': req.body.loginForm.id })
      //       }
      //     })
    }
    // 비밀번호 틀림
    else {
      res.json({
            loginSuccess: false,
            message: "올바르지 않는 비밀번호입니다.",
          });
    }
  }
})

module.exports = router;
