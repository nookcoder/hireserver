var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');
var logger = require('morgan');
var cors = require('cors'); //교차통신 모듈 호출

//var indexRouter = require('./routes'); ///index
var companysRouter = require('./routes/companys');
var noticesRouter = require('./routes/notices');
var apiRouter = require('./routes/api');
var recruitmentRouter = require('./routes/recruitments');
const resumeRouter = require('./routes/resume');

const { sequelize } = require('./models');
// var sequelize = require('./models').sequelize;

var app = express();

app.use(cors())//교차통신 적용

sequelize.sync({ force: false })
  .then(() => {
      console.log('데이터베이스 연결.');
  })
  .catch((err) => {
      console.error('데이터베이스 연결 실패.');
      console.error(err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/company', companysRouter);
app.use('/api/notice', noticesRouter);
app.use('/api', apiRouter);
app.use('/api/recruitment', recruitmentRouter);
app.use('/api/resume',resumeRouter);
//sapp.use(history()); // 히스토리 모드!
//app.use('/', indexRouter);


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080,(req,res,next)=>{
  console.log('this app listening at 3000 port');
})
module.exports = app;
