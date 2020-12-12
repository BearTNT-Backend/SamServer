import React from 'react';
import IndividualRating from './IndividualRating.jsx';


const Ratings = (props) => {
  if (props.ratings === undefined || props.ratings === null) {
    props.ratings = {
      average: ''
    };
  }

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
      <h2 className='reviews-average'><span className='reviews-red-star'><i className="fas fa-paw"></i></span> {props.ratings.average}  ({props.numOfReviews} reviews)</h2>
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