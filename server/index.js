const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/db.js');
const path = require('path');
const app = express();
const port = 3306;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, '../public')));

// a CREATE route for reviews (that also includes ratings by neccesity)
// refactoring to async await
app.post('/api/reviews-module/reviews/:id', (req, res) => {
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
          res.send(review, ratings);
        }
      }
    }
  }
)};

// this is a READ route for reviews
app.get('/api/reviews-module/reviews/:id', (req, res) => {
  db.getAllDataFromTable('reviews', req.params.id, (err, results) => {
    err ? console.log(err) : res.send(results);
  });
});

// this is a READ route for ratings
app.get('/api/reviews-module/ratings/:id', (req, res) => {
  db.getAllDataFromTable('ratings', req.params.id, (err, results) => {
    err ? console.log(err) : res.send(results);
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


// USE A WRITE STREAM IN THE MIDDLE OF THE PROCESS SO I DON'T NEED TO HOLD THEM ALL IN MEMORY!!!
// ALL IN ONE STEP
// PUSH IT AS A CSV WITH WRITESTREAM
// DON'T USE LIBRARY FOR CSV CREATION

// this is just fetching the content as a whole based on the property
app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.listen(port, () =>{
  console.log(`listing on port: ${port}`);
});