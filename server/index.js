//LOAD BALANCE WITH NGINX
// make that stress test to whatever endpoint will give it the html and javascript (via index probably)
// to clone service, base the copy on an IMAGE of the original
// research loaderio -- tool for testing full process

// perhaps there are version problems with node between global and repo specific.

const newRelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/PostgresDb.js');
const path = require('path');
const app = express();
const port = 3333;

console.log(path.join(__dirname, '../public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

// a CREATE route for reviews (that also includes ratings by neccesity)
//REFACTOR TO USE POSTREVIEW INSTEAD!!!!
app.post('/api/reviews-module/reviews/:id', (req, res) => {
  console.log('About to post review');
  const reqData = req.data.body;
  let review;
  let ratings;
  db.postDataToReviews(req.params.id, reqData.review, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      review = results;
      db.postDataToRatings(req.params.id, reqData.ratings, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          ratings = results;
          db.con.end();
          res.send(review, ratings);
        }
      });
    }
  });
});

// this is a READ route for reviews
app.get('/api/reviews-module/reviews/:id', (req, res) => {
  console.log('About to get all reviews');
  console.log('wonder what req.params.id really is...' + typeof req.params.id);
  db.getReviews(req.params.id, (err, results) => {
    console.log('Im in the callback of getAllData!');
    err ? console.log(err) : res.send(results);
  });
});

// this is a READ route for ratings
app.get('/api/reviews-module/ratings/:ids', (req, res) => {
  console.log('About to get a set of ratings');
  console.log('what is req.params.ids? ' + req.params.ids);
  db.getRatings(req.params.ids, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log('WHAT IS THE RESULTS OF GET RATINGS? ' + JSON.stringify(results));
    res.send(results);
  });
});

// an UPDATE route for reviews
app.put('/api/reviews-module/reviews/:id', (req, res) => {
  db.updateReview(req.data.body, req.params.id, (err, results) => {
    err ? console.log(err) : res.send(results);
  });
});

// an UPDATE route for ratings
app.put('/api/reviews-module/ratings/:id', (req, res) => {
  db.updateRatings(req.data.body, req.params.id, (err, results) => {
    err ? console.log(err) : res.send(results);
  });
});

// a DELETE route for reviews
app.delete('/api/reviews-module/reviews/:id', (req, res) => {
  db.deleteReview(req.params.id, (err, results) => {
    err ? console.log(err) : res.send(results);
  });
});

// this is just fetching the content as a whole based on the property
app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.listen(port, () =>{
  console.log(`listing on port: ${port}`);
});