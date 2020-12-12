import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import Ratings from './Ratings.jsx';
import AllReviews from './AllReviews.jsx';


Modal.setAppElement(document.getElementById('app'));

const PopUpModal = (props) => {
  //RENDERS THE MODAL
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  //RENDERS THE MODAL AND RESETS SEARCH INPUT
  const toggleAndReset = () => {
    props.resetSearch();
    toggleShow();
  };


  return (
    <>
      <button className='btn-see-all-reviews' onClick={toggleShow}>See all {props.numOfReviews} reviews</button>

      <Modal
        className='modal-for-reviews'
        isOpen={show} onHide={toggleShow}
        onRequestClose={toggleAndReset}
      >
        <p hidden>test</p>
        <div className='reviews-module-box'>
          <div className='x-button-reviews'
            onClick={toggleAndReset}
          >
            <i className='fas fa-times x-position-reviews'></i>
          </div>

          <div className='modal-inside-flex'>

            <div className='left-side-modal-reviews'>
              <Ratings
                ratings={props.ratings}
                numOfReviews={props.numOfReviews}
                percentageBar={props.percentageBar}
              />
            </div>

            <div className='right-side-modal-reviews'>
              <div className='inner-right-reviews'>
                <div className='input-form-height'>
                  <div className='input-form-reviews'>
                    <i class='fas fa-search'></i>
                    <input
                      id='search-results'
                      className='input-search-reviews'
                      type='text'
                      onChange={props.handleChange}
                      onKeyDown={props.search}
                    ></input>
                    {props.searchBarEntry.length > 0 &&
                    <i className='fas fa-times-circle clear-search-x'
                      onClick={props.resetSearch}
                    ></i>}
                  </div>
                </div>
                <br></br><br></br>
                <AllReviews
                  isModal={true}
                  reviews={props.reviews}
                  readMore={props.readMore}
                  wordsToHighlight={props.wordsToHighlight}
                />
                <p>{props.noResultsString}</p>
              </div>
            </div>

          </div>
        </div>
      </Modal>
      {console.log('Made it to the end of PopUpModal!')}
    </>
  );
};




export default PopUpModal;