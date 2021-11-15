var express = require('express');
const { Company, Notice } = require('../models');

var router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const notice = await Notice.findAll({where: { company_id: req.params.id }});
    console.log(notice);
    res.json(notice);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/input', async (req, res, next) => {
  const noticeInput = await  Notice.create({
    'title': req.body.noticeForm.title,
    'date': req.body.noticeForm.currentTime,
    'content': req.body.noticeForm.content,
    'company_id': req.body.noticeForm.id,
  })
  console.log(noticeInput);
  res.json({
    success: true,
    message: "등록이 완료되었습니다.",
    noticeInput
  });
});

module.exports = router;
