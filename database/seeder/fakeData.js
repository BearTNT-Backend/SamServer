const faker = require('faker');
const db = require('../db.js');
const fs = require('fs');
const fastcsv = require('fast-csv');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/*
-----------------------------------------
RANDOM GENERATORS
-----------------------------------------
*/

//ADDS .0 TO All WHOLE NUMBER RATINGS
const addPointZero = (arrayOfNumbers) => {
  newArray = [];
  for (var num of arrayOfNumbers) {
    if (num.toString().length === 1) {
      num = num + '.0';
    }
    newArray.push(num);
  }
  return newArray;
};

//RANDOM NUMBER GENERATOR
const randomNumberBetween = (min, max, oneDecimalPoint) => {
  if (oneDecimalPoint) {
    min *= 10;
    max *= 10;
    return ((Math.floor(Math.random() * (max - min + 1)) + min) / 10);
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

//SHUFFLES LISTS
const listShuffle = (arr) => {
  var newOrder = arr.sort(() => Math.random() - 0.5);
  return newOrder;
};

//RANDOM NAME GENERATOR
const randomName = (arrOfNames) => {
  randIndex = Math.floor(Math.random() * (arrOfNames.length - 1));
  return arrOfNames[randIndex];
};

//RANDOM PARAGRAPH GENERATOR
const randomParagraph = (listOfSentences) => {
  var phrases = listShuffle(listOfSentences);
  var length = Math.floor(Math.random() * (phrases.length - 1));
  var paragraph = '';
  while (length >= 0) {
    paragraph = paragraph + ' ' + phrases[length];
    length--;
  }
  return paragraph;
};

/*
-----------------------------------------
CREATING ELEMENTS
-----------------------------------------
*/

var sentences = [
  'This place is awesome!',
  'I want my money back.',
  'I wish I could have stayed longer.',
  'The town was very cute.',
  'Why didn\'t I find this place sooner?',
  'I do not regret anything!',
  'The owner has the best style.',
  'The place smelled very bad!',
  'The owner wouldn\'t let me bring my pet bear.',
  'BEST TRIP EVER!',
  'BE WARNED!',
  'I came here for my honemoon.',
  'It was quite a drive from the airport.',
  'Very much worth it.',
  'We had so much fun!',
  'My partner and I always wanted to visit.',
  'But seriously tell all your friends!',
  'The torcher chamber was a bit too much.',
  'But the owner was cool.',
  'You can tell the owner really likes bears.',
  'NO INDOOR PLUMBING!!',
  'And I would do it again!',
  'The view form the back porch was to die for.'
];

var names = ['Joe Buono', 'Zain Padela', 'Deb Johnson', 'Dylan Ring', 'Zach McCain', 'Alysa Shin', 'Rebecca Wiegel', 'Tre\' Moore', 'Henry Fradley', 'Connor Wilson', 'Christina Meador', 'Taylor Anderson', 'John Kelly', 'Frans Larson', 'Michael Wetterauer', 'Nick Mendini', 'Ben Rasmussen', 'Sam Goldie', 'Fabian Yee', 'Matthew Morgan', 'Alex Sandoval', 'Elene Mikaberidze', 'Michael Chen', 'John Campbell', 'David Kim', 'Giovani Maccagno', 'Quentin McMillian', 'Leah Cardon', 'Seth Lassen', 'Mukhtar Bahadory', 'Daniel Lee', 'John Anderton', 'Genaro Salinas', 'Derek Warner-Reyes', 'Mitch McDermott', 'Joe Wnukoski', 'Tyler Bailey', 'Jeremy England', 'Brandon Elzy', 'Parker Stafford'];

//LINKS TO ALL THE PROFILE PICTURES
var profilePics = [
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-1310522.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-1484810.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-220453.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-2726111.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-3770317.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-3775540.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-3851312.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-3970387.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-4100670.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-4123910.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-4153618.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-415829.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-4626351.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-4886781.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-4886801.jpeg',
  'https://beartnt-profile-photos.s3.us-east-2.amazonaws.com/beartnt+profile+photos/pexels-photo-5853675.jpeg'
];

//LISTING CREATER:
const createAListing = () => {
  var bnb = {};

  // CREATES RATINGS
  var r1 = randomNumberBetween(1, 5, true);
  var r2 = randomNumberBetween(1, 5, true);
  var r3 = randomNumberBetween(1, 5, true);
  var r4 = randomNumberBetween(1, 5, true);
  var r5 = randomNumberBetween(1, 5, true);
  var r6 = randomNumberBetween(1, 5, true);
  var av = Math.floor(((r1 + r2 + r3 + r4 + r5 + r6) * 10) / 6) / 10;
  var ratingsArray = [av, r1, r2, r3, r4, r5, r6];
  ratingsArray = addPointZero(ratingsArray);

  var ratings = {
    average: ratingsArray[0],
    cleanliness: ratingsArray[1],
    communication: ratingsArray[2],
    checkin: ratingsArray[3],
    accuracy: ratingsArray[4],
    location: ratingsArray[5],
    value: ratingsArray[6]
  };

  // CREATES REVIEWS
  var reviews = [];
  reviews; // huh, isn't this redundant?
  var numberOfReviews = randomNumberBetween(3, 15);
  var pictures = listShuffle(profilePics);
  var classNames = listShuffle(names);

  while (numberOfReviews > 0) {
    var userName = classNames[numberOfReviews]; //faker.name.findName();
    var picUrl = pictures[numberOfReviews];
    var date = `${faker.date.month()} ${randomNumberBetween(2008, 2020)}`;
    var paragraph = randomParagraph(sentences); //faker.lorem.paragraph();

    reviews.push({
      name: userName,
      date: date,
      reviewBody: paragraph,
      profilePic: picUrl
    });
    numberOfReviews--;
  }

  bnb.ratings = ratings;
  bnb.reviews = reviews;
  return bnb;
};

//CREATE A MEGA OBJECT
const make100 = () => {
  var count = 1;
  var all100 = {};
  var allReviews = [];
  var allRatings = [];

  while (count !== 101) {
    var data = createAListing();
    //SETS THE RELATIONAL ID
    data.ratings.ratingsId = count;
    data.reviews.map(review => {
      review.ratingsId = count;
    });
    allRatings.push(data.ratings);
    allReviews = allReviews.concat(data.reviews);
    count++;
  }
  all100.ratings = allRatings;
  all100.reviews = allReviews;
  return all100;
};

/*
-----------------------------------------
WRITING TO CSV FILES
-----------------------------------------
*/

//WRITE TO CSV FILES
const writeToCsv = () =>{
  var fullPackage = make100();

  //RATING CSV WRITER
  const csvRatingWriter = createCsvWriter({
    path: './database/seeder/ratings.csv',
    header: [
      {id: 'average', title: 'AVERAGE'},
      {id: 'cleanliness', title: 'CLEANLINESS'},
      {id: 'communication', title: 'COMMUNICATION'},
      {id: 'checkin', title: 'CHECKIN'},
      {id: 'accuracy', title: 'ACCURACY'},
      {id: 'location', title: 'LOCATION'},
      {id: 'value', title: 'VALUE'},
      {id: 'ratingsId', title: 'RATINGS_ID'}
    ]
  });

  csvRatingWriter.writeRecords(fullPackage.ratings)
    .then(() => {
      console.log('successfull writing the ratings');
    });

  //REVIEW CVS WRITER
  const cvsReviewWriter = createCsvWriter({
    path: './database/seeder/reviews.csv',
    header: [
      {id: 'name', title: 'NAME'},
      {id: 'date', title: 'DATE'},
      {id: 'reviewBody', title: 'REVIEW_BODY'},
      {id: 'profilePic', title: 'PROFILE_PIC'},
      {id: 'ratingsId', title: 'RATINGS_ID'}
    ]
  });

  cvsReviewWriter.writeRecords(fullPackage.reviews)
    .then(() => {
      console.log('successfull writing the reviews');
    });
};

console.log('ABOUT TO WRITE TO CSV');
writeToCsv();

/*
-----------------------------------------
READ CVS FILES, QUERY TO DATABASE
-----------------------------------------
*/

// FUNCTION TO LOAD MYSQL
const downloadIntoDatabase = (tableName, data) => {
  // console.log(tableName);
  console.log('heres the datatype: ' + typeof data[0]);
  console.log('is it an array?' + Array.isArray(data[0]));
  console.log('HERES THE DATA AT START OF DOWNLOAD: ' + data[0][0]);
  var queryString;
  if (tableName === 'reviews') {
    console.log('it was a review');
    queryString = `INSERT INTO ${tableName} (name, date, reviewBody, profilePic, ratings_id) VALUES ?`;
  } else {
    console.log('it was a rating');
    queryString = `INSERT INTO ${tableName} (average, cleanliness, communication, checkin, accuracy, location, value, ratings_id) VALUES ?`;
  }
  db.con.query(queryString, [data] (err, res) => {
    console.log('this is the err: ' + err);
    console.log('this is the result: ' + res);
  });
  // return new Promise((resolve, reject) => {
  //   console.log('did I make it here at least?');
  //   debugger;
  //   db.con.query(queryString, data, (err, res) => {
  //     console.log('its the error: ' + err);
  //     console.log('its the result: ' + res);
  //     db.con.end();
  //     err ? reject(err) : resolve(console.log(`wahoo ${tableName} filled`));
  //   });
  // }).catch(err => {
  //   console.log('promise failed to deliver with: ' + err);
  // });
};

//function to read csv files
var ratingsStream = fs.createReadStream('database/seeder/ratings.csv');
var ratingsData = [];

var reviewsStream = fs.createReadStream('database/seeder/reviews.csv');
var reviewsData = [];

var readCsvFile = (stream, dataStorage, table) => {
  var csvStream = fastcsv
    .parse()
    .on('uncaughtException', function (err) {
      console.log(err);
    })
    .on('data', (data) => {
      dataStorage.push(data);
    })
    .on('end', () => {
      //REMOVES THE FIRST LINE OF FILE(HEADER)
      dataStorage.shift();
      console.log('about to download');
      downloadIntoDatabase(table, dataStorage);
      console.log('after the download?');
    });
  stream.pipe(csvStream);
};

console.log('IM ABOUT TO READ CSV FILES FOR RATINGS AND REVIEWS!');
readCsvFile(ratingsStream, ratingsData, 'ratings');
readCsvFile(reviewsStream, reviewsData, 'reviews');
