// create index on specific column on a table,
// research createIndex

const faker = require('faker');
// const db = require('../db.js');
const fs = require('fs');
// const fastcsv = require('fast-csv');
const csv = require('csv');
// const createCsvWriter = require('csv-writer').createArrayCsvWriter;
// const db = require('../PostgresDb.js');

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

let reviewIndex = 0;
let ratingsIndex = 0;
let currentReviewCap = 0;
let reviewBatch = '';
let ratingsBatch = '';
let createIndex;

const createRatingsBatch = (quantity) => {
  ratingsBatch = '';
  for (createIndex = 0; createIndex < quantity; createIndex++) {
    ratingsBatch += `${ratingsIndex.toString()}, ${randomNumberBetween(1, 5, true)}, ${randomNumberBetween(1, 5, true).toString()}, ${randomNumberBetween(1, 5, true).toString()}, ${randomNumberBetween(1, 5, true).toString()}, ${randomNumberBetween(1, 5, true).toString()}, ${randomNumberBetween(1, 5, true).toString()}\n`;
    ratingsIndex++;
  }
  return ratingsBatch;
};

const createReviewBatch = (listId, quantity) => {
  reviewBatch = '';
  for (createIndex = 0; createIndex < quantity; createIndex++) {
    reviewBatch += `${reviewIndex.toString()}, ${listId.toString()}, ${listShuffle(names)[createIndex]}, ${faker.date.month()} ${randomNumberBetween(2008, 2020)}, ${randomParagraph(sentences)}, ${listShuffle(profilePics)[createIndex]}, ${reviewIndex.toString()}\n`;
    reviewIndex++;
  }
  // allRatingsSets[nextIndex] = {
  //   ratingsId: nextIndex,
  //   average: randomNumberBetween(1, 5, true),
  //   cleanliness: randomNumberBetween(1, 5, true),
  //   communication: randomNumberBetween(1, 5, true),
  //   checkin: randomNumberBetween(1, 5, true),
  //   accuracy: randomNumberBetween(1, 5, true),
  //   location: randomNumberBetween(1, 5, true),
  //   value: randomNumberBetween(1, 5, true)
  // };
  return reviewBatch;
};

// let ratingsStream = fs.createWriteStream('database/seeder/ratingsBatch2.csv');
let reviewsStream = fs.createWriteStream('database/seeder/reviews.csv');

// no real point to allListings

// doruk suggestion: one thing focused on at once
// csv for primary entries first (reviews)
// then do entries for ratings
// I can still write batches of reviews to give them the same id in regard to the listings
// I have to pass in the product Id to the function doing the writing!!!

const writeTenMillionListings = (cb) => {
  const writeOnce = (prodId) => {
    dataIsLeft = true;
    do {
      console.log(prodId);
      if (prodId === 10000001) {
        reviewsStream.write(createReviewBatch(prodId, randomNumberBetween(3, 12)), cb);
      } else {
        dataIsLeft = reviewsStream.write(createReviewBatch(prodId, randomNumberBetween(3, 12)));
        prodId++;
      }
    } while (prodId < 10000001 && dataIsLeft);
    if (prodId < 10000001) {
      reviewsStream.once('drain', () => {
        console.log('Successfully drained');
        writeOnce(prodId);
      });
    }
  };
  writeOnce(0);
};

const write100Ratings = (cb) => {
  const writeOnce = (prodId) => {
    dataIsLeft = true;
    do {
      console.log(prodId);
      if (prodId === 101) {
        ratingsStream.write(createRatingsBatch(prodId, randomNumberBetween(3, 12)), cb);
      } else {
        dataIsLeft = ratingsStream.write(createRatingsBatch(prodId, randomNumberBetween(3, 12)));
        prodId++;
      }
    } while (prodId < 101 && dataIsLeft);
    if (prodId < 101) {
      ratingsStream.once('drain', () => {
        console.log('Successfully drained');
        writeOnce(prodId);
      });
    }
  };
  writeOnce(0);
};

const write100Reviews = (cb) => {
  const writeOnce = (prodId) => {
    dataIsLeft = true;
    do {
      console.log(prodId);
      if (prodId === 101) {
        reviewsStream.write(createReviewBatch(prodId, randomNumberBetween(3, 12)), cb);
      } else {
        dataIsLeft = reviewsStream.write(createReviewBatch(prodId, randomNumberBetween(3, 12)));
        prodId++;
      }
    } while (prodId < 101 && dataIsLeft);
    if (prodId < 101) {
      reviewsStream.once('drain', () => {
        console.log('Successfully drained');
        writeOnce(prodId);
      });
    }
  };
  writeOnce(0);
};

// write100Reviews(() => {
//   reviewsStream.end();
// });

const writeTenMillionRatings = (cb) => {
  const writeOnce = (prodId) => {
    dataIsLeft = true;
    do {
      console.log(prodId);
      if (prodId === 10000001) {
        ratingsStream.write(createRatingsBatch(prodId, randomNumberBetween(3, 12)), cb);
      } else {
        dataIsLeft = ratingsStream.write(createRatingsBatch(prodId, randomNumberBetween(3, 12)));
        prodId++;
      }
    } while (prodId < 10000001 && dataIsLeft);
    if (prodId < 10000001) {
      ratingsStream.once('drain', () => {
        console.log('Successfully drained');
        writeOnce(prodId);
      });
    }
  };
  writeOnce(0);
};

// writeTenMillionRatings(() => {
//   ratingsStream.end();
// });

const writeTenMillionReviews = (cb) => {
  const writeOnce = (prodId) => {
    dataIsLeft = true;
    do {
      console.log(prodId);
      if (prodId === 10000001) {
        reviewsStream.write(createReviewBatch(prodId, randomNumberBetween(3, 12)), cb);
      } else {
        dataIsLeft = reviewsStream.write(createReviewBatch(prodId, randomNumberBetween(3, 12)));
        prodId++;
      }
    } while (prodId < 10000001 && dataIsLeft);
    if (prodId < 10000001) {
      reviewsStream.once('drain', () => {
        console.log('Successfully drained');
        writeOnce(prodId);
      });
    }
  };
  writeOnce(0);
};

writeTenMillionReviews(() => {
  reviewsStream.end();
});

const writeFiveHundredThousandRatings = (cb) => {
  const writeOnce = (prodId) => {
    dataIsLeft = true;
    do {
      console.log(prodId);
      if (prodId === 500001) {
        ratingsStream.write(createRatingsBatch(randomNumberBetween(3, 12)), cb);
      } else {
        dataIsLeft = ratingsStream.write(createRatingsBatch(randomNumberBetween(3, 12)));
        prodId++;
      }
    } while (prodId < 500001 && dataIsLeft);
    if (prodId < 500001) {
      ratingsStream.once('drain', () => {
        console.log('Successfully drained');
        writeOnce(prodId);
      });
    }
  };
  writeOnce(0);
};

// writeFiveHundredThousandRatings(() => {
//   ratingsStream.end();
// });