// read thoroughly the npm docs for createRecordWriter
// segment into various things:
// must be fully aware of npm package aspects (no laziness)
// function inputs and outputs. how is it interacted with?
// after that:
// (maybe even make a little js file for csv file)
// I don't HAVE to use the csvWriter. I can choose whatever.

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myMongoDb', {useNewUrlParser: true});

const db = mongoose.connection;

const reviewSchema = new mongoose.Schema({
  name: String,
  date: String,
  reviewBody: String,
  profilePic: String,
  ratings: [{
    average: String,
    cleanliness: String,
    communication: String,
    checkin: String,
    accuracy: String,
    location: String,
    value: String
  }]
});

const Review = mongoose.model('Review', reviewSchema);

// const fakeReview = new Review({ name: 'Samanthathathathat', date: 'whatever', reviewBody: 'I hated this place.', profilePic: 'someanimepic.png', ratings: [{average: '3', cleanliness: '3', communication: '3', checkin: '3', accuracy: '3', location: '3', value: '3' }] });

// const fakeReview2 = new Review({ name: 'Evil Sam', date: 'evil whatever', reviewBody: 'I loved this place.', profilePic: 'someanimepic.png', ratings: [{average: '3', cleanliness: '3', communication: '3', checkin: '3', accuracy: '3', location: '3', value: '3' }] });

// fakeReview.save((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Data saved');
//   }
// });

const postReviews = (callback, reviews) => {
  // console.log('heres the reviews object: ' + reviews);
  // console.log('is reviews an array? ' + Array.isArray(reviews));
  // console.log('the type of reviews: ' + typeof reviews);
  // for (let review of reviews) {
  //   console.log('heres the review: ' + JSON.stringify(review));
  //   for (let item of review) {

  //     console.log('heres a review item: ' + item);
  //   }
  // }
  // inputs I need: an object representing the various fields and the associated values
  Review.insertMany(reviews)
    .then(res => {
      // console.log('heres the result: ' + res);
      // console.log('Data inserted');
      callback(null, res);
    }).catch(err => {
      console.log(err);
    });
  // console.log('the length of the reviews passed to insertMany: ' + reviews.length);
  // console.log('the type of the reviews: ' + typeof reviews);
  // console.log('the type of the first item in reviews: ' + typeof reviews[0]);
  // console.log('is the first item in reviews an array? ' + Array.isArray(reviews[0]));
  // console.log('the first item in reviews: ' + reviews[0]);
  // console.log('the first item in the first item in reviews: ' + reviews[0][0]);
  // console.log('is reviews an array? ' + Array.isArray(reviews));
};

// postReviews((err, res) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(res);
// }, fakeReview, fakeReview2);

// const con = mysql.createConnection({
//   host: 'localhost',
//   port: '3306',
//   user: 'sammy',
//   password: 'password',
//   database: 'beartnt_reviews'
// });

const postDataToRatings = (params, id, callback) => {
  id = id || 5;
  var query = `INSERT INTO ratings VALUES (${params.average}, ${params.cleanliness}, ${params.communication}, ${params.checkin}, ${params.accuracy}, ${params.location}, ${params.value})`;
  con.query(query, (err, res) => {
    if (err) {
      callback(err);
    } else {
      con.end();
      callback(null, res);
    }
  });
};

const getAllDataFromTable = (table, id, callback) => {
  id = id || 5;
  var query = `SELECT * FROM ${table} WHERE ratings_id = ${id}`;
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};
// the connection doesn't seem to close, which is odd

// update review function
const updateReview = (params, id, callback) => {
  id = id || 5;
  var updateSnippet = '';
  for (let key of params) {
    updateSnippet += `${key}: ${params[key]},`;
  }
  var query = `UPDATE [LOW_PRIORITY] [IGNORE] reviews
               SET
                  ${updateSnippet}
               WHERE ratings_id = ${id}`;
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};

// update rating function
const updateRatings = (params, id, callback) => {
  id = id || 5;
  var updateSnippet = '';
  for (let key of params) {
    updateSnippet += `${key}: ${params[key]},`;
  }
  var query = `UPDATE [LOW_PRIORITY] [IGNORE] ratings
               SET
                  ${updateSnippet}
               WHERE ratings_id = ${id}`;
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};

// delete review function
const deleteReview = (id, callback) => {
  id = id || 5;
  var query = `DELETE FROM reviews
               WHERE ratings_id = ${id}`; // does this handle foreign keys? probably not
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};


module.exports = {
  postReviews,
  postDataToRatings,
  getAllDataFromTable,
  updateReview,
  updateRatings,
  deleteReview,
  Review
};