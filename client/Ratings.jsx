import React from 'react';
import IndividualRating from './IndividualRating.jsx';

const calculateListingScore = (scores) => {
  let total = 0;
  let n = 0;
  for (let score of scores) {
    total += Number(score.average);
    n++;
  }
  total *= 10;
  total /= n;
  return total.toString()[0] + '.' + total.toString()[1];
};

const Ratings = (props) => {
  // if (props.ratings === undefined || props.ratings === null) {
  //   props.ratings = {
  //     average: ''
  //   };
  // }
  // PERHAPS I SHOULD START HERE TOMORROW!!!!
  //LOCATES NAME AND RATINGS
  var arrOfRatings = [];
  for ( var key in props.ratings) {
    if (key !== 'ratingsid' && key !== 'average') {
      arrOfRatings.push({name: key, score: props.ratings[key]});
    }
  }

  console.log('HERE ARE PROPS IN RATINGS: ' + JSON.stringify(props));
  return (
    <div>
      <h2 className='reviews-average'><span className='reviews-red-star'><i className="fas fa-paw"></i></span> {calculateListingScore(props.ratings)}  ({props.numOfReviews} reviews)</h2>
      <div className='ratings-box'>
        {arrOfRatings.map(rating => {
          return (
            <IndividualRating
              key={rating}
              rating={rating}
              percentageBar={props.percentageBar}
            />
          );
        })}
        <p hidden>test</p>
      </div>
    </div>
  );
};

export default Ratings;