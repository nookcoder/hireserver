var express = require('express');
const { Company, Notice } = require('../models');

var router = express.Router();

// 모집 공고 글 확인 만.
router.get('/:id', async (req, res, next) => {
  try {
    const notice = await Notice.findOne({where: { id: req.params.id }});
    console.log(notice);
    res.json(notice);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
