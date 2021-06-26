var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var gallery = require('express-photo-gallery');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var i18n = require("i18n");

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var blogRouter =  require('./routes/blog');
var hommeRouter = require('./routes/espaceHomme');
var errorRouter = require('./routes/404');
var activitesRoute = require('./routes/activites');
var necrologieRouter = require('./routes/necrologie');
var messageRouter = require('./routes/message'); 
var contactRouter = require('./routes/contact');
var beauteRouter = require('./routes/beaute');
var cuisineRouter = require('./routes/cuisine');
var coverSpender = require('./routes/coverSpender');
var projetRouter = require('./routes/projets');

var compression = require('compression');
var helmet = require('helmet');

var app = express();
app.use(cookieParser());


// Use Helmet for vulnerability protection
app.use(helmet());

// Use compression middleware
app.use(compression());




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

i18n.configure({ // ?lang=ch
  locales:['fr','en', 'de'],
  directory: __dirname + '/locales',
  cookie: 'language',
  queryParameter: 'lang',
  defaultLocale: 'fr',
  autoReload: true,
});

app.use(i18n.init);

var options = {
  title: 'bonnivoire activités'
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(express.json());
//app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
//app.use('/users', usersRouter);
app.use('/contact', contactRouter);
app.use('/gallery', gallery('public/gallery', options));
app.use('/blog', blogRouter);
app.use('/espaceHomme', hommeRouter);
app.use('/404', errorRouter);
app.use('/activites', activitesRoute);
app.use('/necrologie', necrologieRouter);
app.use('/beaute', beauteRouter);
app.use('/cuisine', cuisineRouter);
app.use('/message', messageRouter);
app.use('/coverSpender', coverSpender);
app.use('/projets', projetRouter);


var mailer = require('nodemailer').createTransport( {

  host: process.env.EMAIL_SEND_HOST,
  port: process.env.EMAIL_SEND_POST,
  secure: true,
  auth: {
    user: process.env.SEND_ADDRESS,
    pass: process.env.SEND_PASSWORD,
  }
});

app.get('/status', function(req, res, next) {
  var tempFile="/public/images/documents/SatzungBonnIvoire.pdf";
	fs.readFile(__dirname + tempFile, function (err,data){
	res.contentType("application/pdf");
  res.send(data);
    });
  });


app.get('/adhesion', function(req, res, next) {
  var tempFile="/public/images/documents/FicheAdhesion.pdf";
  fs.readFile(__dirname + tempFile, function (err,data){
  res.contentType("application/pdf");
  res.send(data);
  });
});

app.get('/LIKongress2019', function(req, res, next) {
  var tempFile="/public/images/documents/LIKongress2019.pdf";
  fs.readFile(__dirname + tempFile, function (err,data){
  res.contentType("application/pdf");
  res.send(data);
  });
});

app.get('/AGE', function(req, res, next) {
  var tempFile="/public/images/documents/ConvocationAG_2019.pdf";
  fs.readFile(__dirname + tempFile, function (err,data){
  res.contentType("application/pdf");
  res.send(data);
  });
});

app.get('/sortie', function(req, res, next) {
  var tempFile="/public/images/documents/Ausflug_nach_Remagen_Wald_und_Wildpark_Rolandseck.pdf";
  fs.readFile(__dirname + tempFile, function (err,data){
  res.contentType("application/pdf");
  res.send(data);
  });
});


app.post('/', function(req, res){
  console.log(req.body);
 const output=`
              <h3>Contact Details</h3>
                 <ul>
                  <li>Nom : ${req.body.name}</li>
                  <li>Prenom : ${req.body.surname}</li>
                  <li>Email is : ${req.body.email}</li>
                 </ul>
              <h3>Message</h3>
                <p>${req.body.message}</p>`;

  mailer.sendMail({
    from: req.body.from,
    to: [process.env.CONTACT_ADDRESS],
    subject: req.body.subject || '[No subject]',    
    html: output || '[No message]',
  }, function(err, info) {
    if (err)  return res.status(500).send(err);
    res.json({success: true});
  })

  res.redirect('/contact');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.status(404).render('404');
  //next(res.render('about'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  //res.render('about');
});
module.exports = app;
