var express = require('express');
var router = express.Router();


var mongoHelper = require("../mongoHelper.js");

router.get('/object/:keyName', function(req, res, next) {
  var data = {key:req.params.keyName, timestamp: req.query.timestamp};
  mongoHelper.findDocument(data, function(result) {
    res.send(result);
  });
});

router.post('/object', function(req, res, next){
  var keyName = Object.keys(req.body)[0]
  var data = {key: keyName, value: req.body[keyName]};
  mongoHelper.updateInsertDocument(data, function(result) {
    if (req.body.flag) {
      var string = encodeURIComponent(result);
      res.redirect('/?result=' + result);
    }
    else {
      res.sendStatus(200);
    }
  });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  var result = req.query.result || '';
  res.render('index', { result: result });
});

router.post('/find', function(req, res, next) {
  mongoHelper.findDocument(req.body, function(result) {
    var string = encodeURIComponent(result);
    res.redirect('/?result=' + result);
  });
});

router.post('/updateInsert', function(req, res, next){
  var data = {key: req.body.key, value: req.body.value};
  mongoHelper.updateInsertDocument(data, function(result) {
    var string = encodeURIComponent(result);
    res.redirect('/?result=' + result);
  });
});

module.exports = router;
