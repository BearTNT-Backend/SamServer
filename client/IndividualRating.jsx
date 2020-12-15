import React from 'react';

const IndividualRating = (props) => {
  console.log('what are the props of individual rating: ' + JSON.stringify(props));

  return (
    <div className='individual-ratings-box'>
      <div className='individual-rating-label'>{props.rating.name}
      </div>
      <div className='individual-score-bar'>
        <div className='individual-base-layer'>
          <div style={props.percentageBar(props.rating.score.average)}></div>
        </div>
        <div></div>
      </div>

      <div className='individual-score'>
        <small>&nbsp; &nbsp;{props.rating.score.average}</small>
        <p hidden>test</p>
      </div>
    </div>
  );

};

export default IndividualRating;