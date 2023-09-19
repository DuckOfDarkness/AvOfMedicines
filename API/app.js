var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fmt = require('./utils/dateFormatting.js');
var indexRouter = require('./routes/index');
var cors = require('cors');

const app = express();


//linking date formatting function
app.use((req, res, next) => {
  res.locals.fmt = fmt;
  next();
});

const i18n = require('i18n');
i18n.configure({
  locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  defaultLocale: "pl",
  cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o języku aktualnie wybranym przez użytkownika
});

const session = require('express-session');
app.use(session({
  secret: 'password',
  resave: false
}));


app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
});

const wholesalerRouter = require('./routes/wholesalerRoute.js');
const medicinesRouter = require('./routes/medicinesRoute.js');
const producerRouter = require('./routes/producerRoute.js');
const wholesaler_medicinesRouter = require('./routes/wholesaler_medicinesRoute.js');
const loginRouter = require('./routes/loginRoute')

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit().catch(err => {
  console.log(err);
});

const authApiRouter = require('./routes/api/AuthApiRoute');
const medicinesApiRouter = require('./routes/API/MedicinesApiRoute');
const wholesaler_medicinesApiRouter = require('./routes/API/Wholesaler_MedicinesApiRoute');
const producerApiRouter = require('./routes/API/ProducerApiRoute');
const wholesalerApiRouter = require('./routes/API/WholesalerApiRoute');
const userApiRouter = require('./routes/API/UserApiRoute')

const authUtils = require('./utils/authUtils');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser('secret'));
app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
});


app.use(i18n.init);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/wholesaler',authUtils.permitAuthenticatedUser, wholesalerRouter);
app.use('/medicines',authUtils.permitAuthenticatedUser, medicinesRouter);
app.use('/producer',authUtils.permitAuthenticatedUser, producerRouter);

app.use('/wholesaler', wholesalerRouter);
app.use('/medicines', medicinesRouter);
app.use('/producer', producerRouter);
app.use('/wholesaler_medicines', wholesaler_medicinesRouter);
app.use('/login', loginRouter)

app.use('/api/medicines', medicinesApiRouter);
app.use('/api/wholesaler_medicines', wholesaler_medicinesApiRouter);
app.use('/api/producer', producerApiRouter);
app.use('/api/wholesaler', wholesalerApiRouter);
app.use('/api/login', userApiRouter);
app.use('/api/auth', authApiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
