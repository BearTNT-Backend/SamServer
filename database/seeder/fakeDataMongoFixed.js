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

let addPointZeroArray = [];

//ADDS .0 TO All WHOLE NUMBER RATINGS
// const addPointZero = (arrayOfNumbers) => {
//   addPointZeroArray = [];
//   for (var num of arrayOfNumbers) {
//     if (num.toString().length === 1) {
//       num = num + '.0';
//     }
//     addPointZeroArray.push(num);
//   }
//   return addPointZeroArray;
// };

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
  return arr.sort(() => Math.random() - 0.5);
};

//RANDOM NAME GENERATOR
const randomName = (arrOfNames) => {
  return arrOfNames[Math.floor(Math.random() * (arrOfNames.length - 1))];
};

let paragraphLength = 0;
let currentParagraph = '';

//RANDOM PARAGRAPH GENERATOR
const randomParagraph = (listOfSentences) => {
  listOfSentences = listShuffle(listOfSentences);
  paragraphLength = randomNumberBetween(3, 15);
  currentParagraph = '';
  while (paragraphLength >= 0) {
    currentParagraph += listShuffle(listOfSentences)[paragraphLength] + ' ';
    paragraphLength--;
  }
  return currentParagraph;
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

let allListings = {};
let nextIndex = 0;
let currentReviews = [];
let currentReviewCount = 0;

const createReviews = () => {
  currentReviews = [];
  currentReviews.push({
    average: randomNumberBetween(1, 5, true),
    cleanliness: randomNumberBetween(1, 5, true),
    communication: randomNumberBetween(1, 5, true),
    checkin: randomNumberBetween(1, 5, true),
    accuracy: randomNumberBetween(1, 5, true),
    location: randomNumberBetween(1, 5, true),
    value: randomNumberBetween(1, 5, true)
  });
  return currentReviews;
};

const createAListing = () => {
  currentReviewCount = randomNumberBetween(3, 15);
  allListings[nextIndex] = {
    userName: listShuffle(names)[currentReviewCount], //faker.name.findName();
    picUrl: listShuffle(profilePics)[currentReviewCount],
    date: `${faker.date.month()} ${randomNumberBetween(2008, 2020)}`,
    paragraph: randomParagraph(sentences), //faker.lorem.paragraph();
    reviews: createReviews()
  };
  nextIndex++;
};

// // CREATE A MEGA OBJECT
// const make10 = () => {
//   var count = 1;
//   var all10 = [];

//   while (count !== 10) {
//     all10.push(createAListing());
//     count++;
//   }
//   return all10;
// };

// // CREATE A MEGA OBJECT
// const make100 = () => {
//   var count = 1;
//   var all100 = {};

//   while (count !== 101) {
//     all100[count] = createAListing();
//     count++;
//   }
//   console.log('How many items are being output by make100? ' + all100.length);
//   return all100;
// };

// const makeTenMillion = () => {
//   var count = 1;
//   var allTenMillion = {};

//   while (count !== 10000001) {
//     allTenMillion[count] = createAListing();
//     count++;
//   }
//   return allTenMillion;
// };

/*
-----------------------------------------
READ CVS FILES, QUERY TO DATABASE
-----------------------------------------
*/

// FUNCTION TO LOAD MYSQL
// const downloadIntoDatabase = (data) => {
//   for (let item of data) {
//     console.log('heres a data item: ' + item);
//   }
//   db.postReviews((err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('Data downloaded to database!');
//   }, data);
// };

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

// const writeOneHundredItems = (data, callback) => {
//   var writeStream = fs.createWriteStream('database/seeder/reviews.json');
//   let i = 100;
//   let dataIsLeft;
//   const writeOnce = () => {
//     dataIsLeft = true;
//     do {
//       i--;
//       if (i === 0) {
//         writeStream.write(JSON.stringify(data), callback);
//       } else {
//         dataIsLeft = writeStream.write(JSON.stringify(data));
//       }
//     } while (i > 0 && dataIsLeft);
//     if (i > 0) {
//       writeStream.once('drain', writeOnce);
//     }
//   };
//   writeOnce();
// };

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

// const writeOneHundredThousandItems = (callback) => {
//   console.log('HI IM INSIDE ONE HUNDRED THOUSAND ITEMS FUNCTION DEF');
//   var writeStream = fs.createWriteStream('database/seeder/reviews.json');
//   let dataIsLeft;
//   const writeOnce = () => {
//     dataIsLeft = true;
//     do {
//       if (nextIndex === 100001) {
//         createAListing();
//         writeStream.write(`{"${nextIndex}": ${JSON.stringify(allListings[nextIndex - 1])}}`, callback);
//       } else {
//         createAListing();
//         dataIsLeft = writeStream.write(`{"${nextIndex}": ${JSON.stringify(allListings[nextIndex - 1])}}`, callback);
//       }
//     } while (nextIndex < 100001 && dataIsLeft);
//     if (nextIndex < 100001) {
//       console.log('Time to drain'); // console logs don't work at all?
//       writeStream.once('drain', () => {
//         console.log('Successfully drained');
//         writeOnce();
//       });
//     }
//   };
//   writeOnce();
// };

// writeOneHundredThousandItems(() => {
//   // I can't be posting with callbacks as I go
//   console.log('JSON file complete!');
//   // db.postReviews((err, res) => {
//   //   if (err) {
//   //     console.log(err);
//   //   }
//   // });
// });

var writeStream = fs.createWriteStream('database/seeder/reviews.json');
let dataIsLeft;

const writeTenMillionItems = (cb) => {
  const writeOnce = () => {
    dataIsLeft = true;
    do {
      console.log(nextIndex);
      if (nextIndex === 10000001) {
        createAListing();
        writeStream.write(`{"${nextIndex}": ${JSON.stringify(allListings[nextIndex - 1])}}`, cb);
      } else {
        createAListing();
        dataIsLeft = writeStream.write(`{"${nextIndex}": ${JSON.stringify(allListings[nextIndex - 1])}}`);
        delete allListings[nextIndex - 1];
      }
    } while (nextIndex < 10000001 && dataIsLeft);
    if (nextIndex < 10000001) {
      writeStream.once('drain', () => {
        console.log('Successfully drained');
        writeOnce();
      });
    }
  };
  writeOnce();
};

writeTenMillionItems(() => {
  writeStream.end();
});

// const writeFiveMillionItems = () => {
//   var writeStream = fs.createWriteStream('database/seeder/reviews.json');
//   let dataIsLeft;
//   const writeOnce = () => {
//     dataIsLeft = true;
//     do {
//       console.log(nextIndex);
//       if (nextIndex === 5000001) {
//         createAListing();
//         writeStream.write(`{"${nextIndex}": ${JSON.stringify(allListings[nextIndex - 1])}}`);
//       } else {
//         createAListing();
//         dataIsLeft = writeStream.write(`{"${nextIndex}": ${JSON.stringify(allListings[nextIndex - 1])}}`);
//       }
//     } while (nextIndex < 5000001 && dataIsLeft);
//     if (nextIndex < 5000001) {
//       writeStream.once('drain', () => {
//         console.log('Successfully drained');
//         writeOnce();
//       });
//     }
//   };
//   writeOnce();
// };

// writeFiveMillionItems();

// writeTenMillionItems(() => {
//   console.log('Ten million records written!');
//   // I can't be posting with callbacks as I go
//   // console.log('JSON file complete!');
//   // db.postReviews((err, res) => {
//   //   if (err) {
//   //     console.log(err);
//   //   }
//   // });
// });

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