const faker = require('faker');
// const db = require('../db.js');
const fs = require('fs');
// const fastcsv = require('fast-csv');
const csv = require('csv');
// const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const db = require('../Mongodb.js');

// START FROM HERE TOMORROW

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

var names = ['Joe Buono', 'Zain Padela', 'Deb Johnson', 'Dylan Ring', 'Zach McCain', 'Alysa Shin', 'Rebecca Wiegel', 'Tre\' Moore', 'Henry Fradley', 'Connor Wilson', 'Taylor Anderson', 'John Kelly', 'Frans Larson', 'Michael Wetterauer', 'Nick Mendini', 'Ben Rasmussen', 'Sam Goldie', 'Fabian Yee', 'Matthew Morgan', 'Alex Sandoval', 'Elene Mikaberidze', 'Michael Chen', 'John Campbell', 'David Kim', 'Giovani Maccagno', 'Quentin McMillian', 'Leah Cardon', 'Seth Lassen', 'Mukhtar Bahadory', 'Daniel Lee', 'John Anderton', 'Genaro Salinas', 'Derek Warner-Reyes', 'Mitch McDermott', 'Joe Wnukoski', 'Tyler Bailey', 'Jeremy England', 'Brandon Elzy', 'Parker Stafford'];

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

let allListings = {};
let nextIndex = 0;
//LISTING CREATER:
// another part of the issue:
// this createListing is taking up a ton of space
// this object gets created every time
// what can i do instead of making a listing object every time:
// almost need a seed script in which I create a single SUPEROBJECT
// is JSON stringify memory intensify
// inside a for loop I populate the object
// JSON stringify
// passed straight to write stream
// check if I have to drain and do it if I have to
// otherwise keep moving
// until I've reached the record


// reviews.push({
//   name: userName,
//   date: date,
//   reviewBody: paragraph,
//   profilePic: picUrl,
//   ratings: createRatings()
// });

// var date = `${faker.date.month()} ${randomNumberBetween(2008, 2020)}`;

const createAReview = () => {
  return {
    name: names[randomNumberBetween(0, 39)],
    date: `${faker.date.month()} ${randomNumberBetween(2008, 2020)}`,
    reviewBody: randomParagraph(sentences),
    [randomNumberBetween(1, 5, true), ]
  }
};

const createAListing = () => {
  allListings[nextIndex] = [];
  allListings[nextIndex].push(createAReview());

  // FUNCTION THAT CREATES SETS OF RATINGS
  const createRatings = () => {


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
    return ratings;
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
      profilePic: picUrl,
      ratings: createRatings()
    });
    numberOfReviews--;
  }
  return reviews;
};

// CREATE A MEGA OBJECT
const make10 = () => {
  var count = 1;
  var all10 = [];

  while (count !== 10) {
    all10.push(createAListing());
    count++;
  }
  return all10;
};

// CREATE A MEGA OBJECT
const make100 = () => {
  var count = 1;
  var all100 = {};

  while (count !== 101) {
    all100[count] = createAListing();
    count++;
  }
  console.log('How many items are being output by make100? ' + all100.length);
  return all100;
};

const makeTenMillion = () => {
  var count = 1;
  var allTenMillion = {};

  while (count !== 10000001) {
    allTenMillion[count] = createAListing();
    count++;
  }
  return allTenMillion;
};

/*
-----------------------------------------
WRITING TO CSV FILES
-----------------------------------------
*/

//WRITE TO CSV FILES

// writeToCsv function here
// const writeToCsv = () => {
//   var fullPackage = make10();
//   console.log('length of fullPackage: ' + fullPackage.length);
//   // console.log('First of 100 listings!' + JSON.stringify(fullPackage[0]));

//   //REVIEW CSV WRITER
//   // const cvsReviewWriter = createCsvWriter({
//   //   path: './database/seeder/reviews.csv',
//   //   header: [
//   //     {id: 'name', title: 'NAME'},
//   //     {id: 'date', title: 'DATE'},
//   //     {id: 'reviewBody', title: 'REVIEW_BODY'},
//   //     {id: 'profilePic', title: 'PROFILE_PIC'},
//   //     {id: 'ratings', title: 'RATINGS'}
//   //   ]
//   // });

//   console.log('THIS IS THE FULL PACKAGE: ' + fullPackage);

//   cvsReviewWriter.writeRecords(fullPackage[0])
//     .then(() => {
//       console.log('successfully writing the reviews');
//     });
// };

// console.log('ABOUT TO WRITE TO CSV');
// writeToCsv();

/*
-----------------------------------------
READ CVS FILES, QUERY TO DATABASE
-----------------------------------------
*/

// FUNCTION TO LOAD MYSQL
const downloadIntoDatabase = (data) => {
  // console.log(tableName);
  // console.log('Heres the data itself: ' + data);
  // console.log('heres the type of that data: ' + typeof data);
  // console.log('is the data itself an array? ' + Array.isArray(data));
  // console.log('the datatype of an array item from data: ' + typeof data[0]);
  for (let item of data) {
    console.log('heres a data item: ' + item);
  }
  // console.log('heres the datatype: ' + typeof data);
  // console.log('is it an array?' + Array.isArray(data));
  db.postReviews((err, res) => {
    if (err) {
      console.log(err);
    }
    console.log('Data downloaded to database!');
  }, data);
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

// joe method
// opened write stream
// generated data
// then write it to writestream
// then generate data
// then write
// etc

// var reviewsData = [];
// writeStream.on('data', (data) => {
//   writeStream.write(JSON.stringify(data));
// });

// var writeCsvFile = (stream) => {
//   stream.pipe(writeStream);
// };

const writeOneHundredItems = (data, callback) => {
  var writeStream = fs.createWriteStream('database/seeder/reviews.json');
  console.log('heres data in onehundreditems!' + JSON.stringify(data));
  console.log('^^^ data from one hundred items');
  let i = 100;
  const writeOnce = () => {
    let dataIsLeft = true;
    do {
      i--;
      if (i === 0) {
        writeStream.write(JSON.stringify(data), callback);
      } else {
        const dataExists = (writeStream.write(JSON.stringify(data)));
        dataIsLeft = !!dataExists;
      }
    } while (i > 0 && dataIsLeft);
    if (i > 0) {
      writeStream.once('drain', writeOnce);
    }
  };
  writeOnce();

};

// const writeTenMillionItems = (data, callback) => {
//   var writeStream = fs.createWriteStream('database/seeder/reviews.json');
//   let i = 0;
//   const writeOnce = () => {
//     let dataIsLeft = true;
//     do {
//       i++;
//       if (i === 10000000) {
//         console.log(JSON.stringify(data[i]));
//         writeStream.write(JSON.stringify(data[i]), callback);
//       } else {
//         dataIsLeft = writeStream.write(JSON.stringify(data[i]));
//       }
//     } while (i < 10000000 && dataIsLeft);
//     if (i < 10000000) {
//       console.log('DRAINING NOW!'); // console logs don't work at all?
//       writeStream.once('drain', writeOnce);
//     }
//   };
//   writeOnce();
// };

// const megaBatch = makeTenMillion();

// writeTenMillionItems(megaBatch, () => {
//   db.postReviews((err, res) => {
//     if (err) {
//       console.log(err);
//     }
//   }, megaBatch);
// });

const writeOneHundredThousandItems = (callback) => {
  var writeStream = fs.createWriteStream('database/seeder/reviews.json');
  let i = 0;
  const writeOnce = () => {
    let dataIsLeft = true;
    do {
      i++;
      const newListing = {i: createAListing()};
      if (i === 100000) {
        writeStream.write(JSON.stringify(newListing), callback);
      } else {
        dataIsLeft = writeStream.write(JSON.stringify(newListing));
      }
    } while (i < 100000 && dataIsLeft);
    if (i < 100000) {
      console.log('DRAINING NOW!'); // console logs don't work at all?
      writeStream.once('drain', () => {
        console.log('hooray, it drained!');
        writeOnce();
      });
    }
    writeOnce();
  };
};

writeOneHundredThousandItems(() => {
  // I can't be posting with callbacks as I go
  db.postReviews((err, res) => {
    if (err) {
      console.log(err);
    }
  });
});

// use mongoImport
// takes a filepath and imports it into mongo database
// save as a JSON file
// import that JSON file into mongoImport

// writeOneHundredItems(make100(), () => {
//   // var readStream = fs.createReadStream('database/seeder/reviews.csv');
//   console.log('Now writing to database...');
//   // console.log('heres the readStream: ' + JSON.stringify(readStream));
//   db.postReviews((err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('database written!');
//   }, readStream);
// });



// var readCsvFile = (stream, dataStorage) => {
//   var csvStream = fastcsv
//     .parse()
//     .on('uncaughtException', function (err) {
//       console.log(err);
//     })
//     .on('data', (data) => {
//       dataStorage.push(data);
//     })
//     .on('end', () => {
//       //REMOVES THE FIRST LINE OF FILE(HEADER)
//       dataStorage.shift();
//       console.log('===START===');
//       console.log(dataStorage);
//       downloadIntoDatabase(dataStorage); // should i have the zero there?
//       console.log('===END===');
//     });
//   stream.pipe(csvStream);
// };

// console.log('IM ABOUT TO READ CSV FILES FOR RATINGS AND REVIEWS!');
// readCsvFile(writeStream, reviewsData);