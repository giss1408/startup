var express = require('express');
var router = express.Router();

var userCOUNT =0
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(res.__('Hello i18n'));
  res.render('index2', { title: 'bonnivoire-ev'});
});

module.exports = router;
