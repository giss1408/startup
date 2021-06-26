var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('About page');
  res.render('message');
});

/*router.get('/projets', function(req, res, next) {
  //res.send('About page');
  res.render('projets');
});*/

module.exports = router;