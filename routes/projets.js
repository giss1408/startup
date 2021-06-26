var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projets', { title: 'bonnivoire-ev'});
});

router.get('/africa', function(req, res, next) {
	res.render('projetAfrique');
  });

  router.get('/bonn', function(req, res, next) {
	res.render('projetBonn');
  });

module.exports = router;