var express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require('../models/company');
const Notice = require('../models/notice');
const Recruitment = require('../models/recruitment');

var router = express.Router();

router.get('/:company_id/name',async(req,res)=>{
  console.log(req.params);
  try{ 
    const companyName = await Company.findOne({
      where:{
        id: req.params.company_id
      }
    });
    res.send(companyName);
  } catch(err){
    console.log(err);
  }
})

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
      'company_introduce_title': "어서오세요.",
      'company_introduce': "채용 공고 홈페이지에 오신것을 환영합니다.",
    })
    console.log(signupCompany);
    res.json(signupCompany);
  } catch (err) {
    console.error(err);
    next(err);
  }
}
);

// 회사 소개 업데이트 하기 다중 안되나 진짜..
router.patch('/introduce/:id', (req, res) => {
    console.log(req.body.user)
    Company.update({
      'company_introduce': req.body.user.introduce,
    }, { where: { id: req.params.id } })
    Company.update({
      'company_introduce_title': req.body.user.introduceTitle
    }, { where: { id: req.params.id } } )
});

router.get('/login', (req, res) => {
  // 인증 확인
  const token = req.headers['access-token'];

  if (!token) {
    res.json({
      'status': 400,
      'massage': 'Token 없음'
    });
  }
  // 토큰 확인
  const checkToken = new Promise((resolve, reject) => {
    jwt.verify(token, '9Na0SSeCrET2KeY', function (err, decoded) {
      if (err) reject(err);
      resolve(decoded);
    });
  });
  // 토큰이 성공적으로 확인 시, 데이터 보내기
  checkToken.then(
    token => {
      res.status(200).json({
        'status': 200,
        'massage': 'success',
        token
      });
    }
  )
});

// 로그인 확인
router.post('/login', async (req, res) => {
  try {
    const loginCompany = await Company.findOne({
      where: { 'company_id': req.body.id }
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
    if (!bcrypt.compareSync(req.body.password, loginCompany.company_pw))
    {
      return res.json({
        loginSuccess: false,
        accessToken: null,
        message: "올바르지 않는 비밀번호입니다.",
      });
    }
    // 비밀번호 맞음
      return res.json({
        loginSuccess: true,
        accessToken: await createToken(loginCompany.id, loginCompany.company_id, loginCompany.company_name),
        message: "로그인 되셨습니다. 반갑습니다." + loginCompany.company_name + "님",
        });
  }
  } catch (err) {
    console.error(err);
    next(err);
  }
})

function createToken(Id, companyId, companyName) {
  return new Promise((resolve, reject) => {
    jwt.sign({
      id: Id,
      company_id: companyId,
      name: companyName,
    },
      '9Na0SSeCrET2KeY', // 원하는 시크릿 키 - 배포시에 다른 파일에서 불러오기
      {
        algorithm : "HS256",
        expiresIn : "86400",  // 토큰 유효 기간 
        issuer : "na0"
      }, function (err, resultToken) {
      if (err) reject(err);
      else resolve(resultToken)
    });
  })
}

module.exports = router;
