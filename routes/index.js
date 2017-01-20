var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var ObjectID = require('mongodb').ObjectID
var assert = require('assert');
// URL that points to the db
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/proj2';

// GET home page
router.get('/', function(req, res, next){
  // renddr a template with all the quotes
  // connect to mongo
  // find all the quotes
  // disconnect from db
  // render index template with quotes
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('quotes').find().toArray(function(err, quotes){
      db.close();
      var data = {
        quotes: quotes
      }
      // render always takes an object
      res.render('index', data);
    })
  })
})


router.get('/data', function(req, res, next){
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('quotes').find().toArray(function(err, data){
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
    db.collection('quotes').insert(quoteObj, function(err, result){
      assert.equal(null, err);
      console.log('Quote inserted!');
      db.close();
      res.redirect('/')
    })
  })
})


router.post('/update', function(req, res, next){

  var quoteID = req.body.quoteID;
  var source = req.body.source;
  var author = req.body.author;
  var quote = req.body.quote;

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('quotes').updateOne(
      {"_id": ObjectID(quoteID)},
      {$set:
        {'source':source, 'author':author, 'quote':quote}
      },
      function(err, result) {
        db.close();
        res.json(result);
      }
    )
  })
})


router.post('/delete', function(req, res, next){

  var quoteID = req.body.quoteID;
  console.log('THIS NEEDS TO WORK ASAP: ' + quoteID)
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('quotes').deleteOne({"_id": ObjectID(quoteID)},
      function(err, docs){
        db.close();
        res.json(result)
      });
    // res.redirect('/')
  })
})


// GET /search?author=Michelle
router.get('/search', function(req, res, next){
  var author = req.query.author;
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('quotes').find({'author': author}).toArray(function(err, quotes){
      db.close();
      // show the client the results
      res.render('index', {quotes: quotes})
    })
  });
})

module.exports = router;
