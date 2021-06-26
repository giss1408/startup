var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('About page');
  res.render('espaceHomme');
});

module.exports = router;