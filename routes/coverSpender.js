var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('About page');
  res.render('coverSpender');
});

router.get('/coverSpender_en', function(req, res, next) {
	//res.send('About page');
	res.render('coverSpender_en');
  });

module.exports = router;