var express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
router.post('/signup/check', async (req, res) => {
  try {
      const signupCheckID = await Company.findOne({
    where: {
      'company_id': req.body.user_id,
    }
  });
  res.json(signupCheckID);
  } catch (err) {
        console.error(err);
        next(err);
  }
}
);

// 회원가입 확인
router.post('/signup', async (req, res) => {
  try {
    const signupCompany = await Company.create({
      'company_id': req.body.user.id,
      'company_pw': bcrypt.hashSync(req.body.user.password),
      'company_name': req.body.user.name,
      'company_email': req.body.user.email,
    })
    console.log(signupCompany);
    res.json(signupCompany);
  } catch (err) {
    console.error(err);
    next(err);
  }
}
);

// 로그인 확인
router.post('/login', async (req, res) => {
  try {
    const loginCompany = await Company.findOne({
      where: { 'company_id': req.body.loginForm.id }
    })
    
  // 해당 아이디가 없을 경우
  if (!loginCompany) {
    res.json({
        loginSuccess: false,
        message: "존재하지 않는 아이디입니다.",
    });
  }
  else {
    // 아이디 있는데, 비밀번호 틀림
    if (!bcrypt.compareSync(req.body.loginForm.password, loginCompany.company_pw))
    {
      return res.json({
        loginSuccess: false,
        accessToken: null,
        message: "올바르지 않는 비밀번호입니다.",
      });
    }
    console.log(token);
    // 비밀번호 맞음
      return res.json({
        loginSuccess: true,
        accessToken: await token(loginCompany.company_id, loginCompany.company_name),
        message: "로그인 됨용~",
        });
  }
  } catch (err) {
    console.error(err);
    next(err);
  }
})

function token(companyId, companyName) {
  return new Promise((resolve, reject) => {
    jwt.sign({
      id: companyId,
      name: companyName,
    },
      '9Na0SSeCrET2KeY', // 원하는 시크릿 키 - 배포시에 다른 파일에서 불러오기
      {
        algorithm : "HS256", // 해싱 알고리즘
        expiresIn : "86400",  // 토큰 유효 기간 Math.floor(Date.now() / 1000) - 30 }
        issuer : "na0" // 발행자
      }, function (err, resultToken) {
      if (err) reject(err);
      else resolve(resultToken)
    });
  })
}

module.exports = router;
