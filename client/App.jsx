import React from 'react';
import axios from 'axios';
import Ratings from './Ratings.jsx';
import AllReviews from './AllReviews.jsx';
import PopUpModal from './PopUpModal.jsx';
import css from './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: ['4', '5', '3', '4', '5', '3', '4'],
      reviews: [],
      modalReviews: [],
      searchBarEntry: '',
      noResultsString: '',
      wordsToHighlight: '',
    };
    this.percentageBar = this.percentageBar.bind(this);
    this.readMore = this.readMore.bind(this);
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  /*
  ============================================================
    UPON PAGE LOAD
  ============================================================
  */

  componentDidMount () {
    //LAST NUMBER OF URL IS ID
    console.log('App has mounted.');
    var id = window.location.pathname.split('/');
    id = id[id.length - 1];
    if (id.length === 0) {
      id = 67;
    }

    axios.get(`/api/reviews-module/reviews/${id}`)
      .then(data => {
        console.log('Data was retrieved.');
        console.log('what is data.data? ' + JSON.stringify(data.data));
        this.setState({
          reviews: data.data.rows,
          modalReviews: data.data.rows,
        });
      }).then(() => {
        console.log('heres the state of reviews right before axios request to ratings: ' + this.state.reviews);
        axios.get(`/api/reviews-module/ratings/${this.state.reviews.map((review) => {
          console.log('this is a single review in the state of reviews: ' + JSON.stringify(review));
          return review.reviewsid;
        }).toString()}`).then(data => {
          this.setState({
            ratings: data.data.ratings
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  /*
  ============================================================
    RATINGS SPECIFIC FUNCTIONS
  ============================================================
  */

  //SETS THE BLACK PERCENTAGE BAR WIDTH ACCORDING TO SCORE
  percentageBar (score) {
    var styles = {
      height: '5px',
      backgroundColor: 'black',
      borderRadius: '15px'
    };
    styles.width = (score / 5 * 100) + '%';
    return styles;
  }

  /*
  ============================================================
    REVIEWS SPECIFIC FUNCTIONS
  ============================================================
  */

  //SPLITS PARAGRAPH IN TWO FOR READMORE BUTTON
  readMore (string) {
    var position = 100;
    var newString = [string.slice(0, position), string.slice(position)];
    return newString;
  }

  /*
  ============================================================
    MODAL SPECIFIC FUNCTIONS
  ============================================================
  */

  //UPDATES THE STATE OF WORDS TYPED INTO THE SEARCH BAR
  handleChange (e) {
    this.setState({
      searchBarEntry: e.target.value
    });
  }

  //INVOKED UPON ENTER UPDATES STATE OF POPUP REVIEWS
  search (e) {
    console.log('e?', e.target.value);
    if (e.key === 'Enter') {
      // this.resetSearch();
      var newProps = [];
      this.state.reviews.map(prop => {
        if (prop.reviewBody.toLowerCase().includes(this.state.searchBarEntry.toLowerCase())) {
          newProps.push(prop);
        }
      });
      if (newProps.length === 0) {
        this.setState({
          modalReviews: newProps,
          noResultsString: `There are no results for "${this.state.searchBarEntry}"`
        });
      } else {
        this.setState({
          noResultsString: '',
          modalReviews: newProps,
          wordsToHighlight: this.state.searchBarEntry
        });
      }
    }
  }

  //RESETS THE REVIEWS ON A SEARCH RESET
  resetSearch () {
    document.getElementById('search-results').value = '';
    this.setState({
      searchBarEntry: '',
      noResultsString: '',
      wordsToHighlight: '',
      modalReviews: this.state.reviews
    });
  }

  /*
  ============================================================
    RENDER
  ============================================================
  */

  render () {
    console.log('the state of ratings: ' + JSON.stringify(this.state.ratings));

    return (
      <div className='reviews-margin-body'>
        <div className='reviews-full-body'>
          <p hidden>test</p>
          <Ratings
            ratings={this.state.ratings}
            numOfReviews={this.state.reviews.length}
            percentageBar={this.percentageBar}
          />
          <AllReviews
            isModal={false}
            reviews={this.state.reviews.slice(0, 4)}
            wordsToHighlight={this.state.wordsToHighlight}
            readMore={this.readMore}
          />
          <PopUpModal
            reviews={this.state.modalReviews}
            ratings={this.state.ratings}
            numOfReviews={this.state.reviews.length}
            noResultsString={this.state.noResultsString}
            searchBarEntry={this.state.searchBarEntry}
            wordsToHighlight={this.state.wordsToHighlight}
            handleChange={this.handleChange}
            search={this.search}
            readMore={this.readMore}
            percentageBar={this.percentageBar}
            resetSearch={this.resetSearch}
          />
        </div>
      </div>
    );
  }
}

export default App;