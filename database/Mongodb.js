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

const fakeReview = new Review({ name: 'Samanthathathathat', date: 'whatever', reviewBody: 'I hated this place.', profilePic: 'someanimepic.png', ratings: [{average: '3', cleanliness: '3', communication: '3', checkin: '3', accuracy: '3', location: '3', value: '3' }] });

const fakeReview2 = new Review({ name: 'Evil Sam', date: 'evil whatever', reviewBody: 'I loved this place.', profilePic: 'someanimepic.png', ratings: [{average: '3', cleanliness: '3', communication: '3', checkin: '3', accuracy: '3', location: '3', value: '3' }] });

// fakeReview.save((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Data saved');
//   }
// });

const postReviews = (callback, ...reviews) => {
  // inputs I need: an object representing the various fields and the associated values
  Review.insertMany(reviews, (err, res) => {
    if (err) {
      console.log(err);
    }
    callback(null, res);
  });
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
  postDataToRatings,
  getAllDataFromTable,
  updateReview,
  updateRatings,
  deleteReview,
};