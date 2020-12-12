import React from 'react';
import SingleReview from './SingleReview.jsx';

const AllReviews = (props) => {
  console.log('heres the props to AllReviews: ' + JSON.stringify(props));

  return (
    <div className='reviews-box'>
      {props.reviews.map(review => {
        review.display = false;
        return (
          <SingleReview
            isModal={props.isModal}
            key={review.reviewsid}
            review={review}
            readMore={props.readMore}
            wordsToHighlight={props.wordsToHighlight}
          />);
      })}
      <p hidden>test</p>
      {console.log('Made it to the end of AllReviews!')}
    </div>
  );

};

export default AllReviews;