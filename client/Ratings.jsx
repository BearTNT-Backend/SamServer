import React from 'react';
import IndividualRating from './IndividualRating.jsx';


const Ratings = (props) => {
  if (props.ratings === undefined || props.ratings === null) {
    props.ratings = {
      average: ''
    };
  }
  // PERHAPS I SHOULD START HERE TOMORROW!!!!
  //LOCATES NAME AND RATINGS
  var arrOfRatings = [];
  for ( var key in props.ratings) {
    if (key !== 'ratingsid' && key !== 'average') {
      arrOfRatings.push({name: key, score: props.ratings[key]});
    }
  }

  console.log('HERE ARE PROPS IN RATINGS: ' + JSON.stringify(props));
  console.log('here is props.ratings.average: ' + JSON.stringify(props.ratings[0].average)); // currently, this is a string like " 5" with a space first
  return (
    <div>
      <h2 className='reviews-average'><span className='reviews-red-star'><i className="fas fa-paw"></i></span> {props.ratings[0].average}  ({props.numOfReviews} reviews)</h2>
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
      {console.log('Made it to the end of Ratings!')}
    </div>
  );

};

export default Ratings;