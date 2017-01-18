var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
// URL that points to the db
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/proj2';

// GET home page
router.get('/', function(req, res, next){
  res.render('index');
})


router.get('/data', function(req, res, next){
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('quotes').find().toArrary(function(err, data){
      db.close();
      var quoteObj = {
      source: req.body.source,
      author: req.body.author,
      quote: req.body.quote
  }
    })

    res.render('quote-box', {author:author, title:title, quote:quote})
  })
})


router.post('/insert', function(req, res, next){
  var quoteObj = {
    "source": req.body.source,
    "author": req.body.author,
    "quote": req.body.quote
  }

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('quotes').insertOne(quoteObj, function(err, result){
      assert.equal(null, err);
      console.log('Quote inserted!');
      db.close();
      res.redirect('/')
    })
  })
})

router.post('/update', function(req, res, next){

})

router.post('/delete', function(req, res, next){

})

module.exports = router;
