const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// import config
const config = require('./config/index');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const settingRouter = require('./routes/setting');
const shopRouter = require('./routes/shop');

const app = express();

//  import middleware
const errorHandler = require('./middleware/errorHandler')

// connect mongoose
mongoose.connect(config.MONGODB_URI,{
  useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/setting', settingRouter);
app.use('/api/shop', shopRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(errorHandler);

module.exports = app;
