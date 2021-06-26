var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('About page');
  res.render('blog');
});
router.get('/archiveKongossa', function(req, res, next) {
  //res.send('About page');
  res.render('archiveKongossa');
});

module.exports = router;