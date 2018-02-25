import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchOwnReviewsList } from '../../actions';
import { CenterCard121,SquareLoader } from '../utils';

class Reviews extends Component {
  componentDidMount(){
    this.props.fetchOwnReviewsList();
  }
  render() {
    return (
      <div className='reviews-component'>
        <CenterCard121>
        <div className='reviews-list'>
          {this.renderList(this.props.reviews)}
        </div>
        </CenterCard121>
      </div>
    )
  }
  goTo(reviewId){
    this.context.router.history.push(`/review/${reviewId}`);
  }
  renderList(reviews) {
    if(reviews){
      return reviews.map(r=>(
        <div key={r.productId}>
          <button onClick={this.goTo.bind(this,r._id)} className='product-item'>
            {r._id}
          </button>
        </div>
      ))
    }
    return (<SquareLoader style={{'margin': '100px auto'}}/>);
  }
}

function mapStateToProps(props) {
  console.log(props.review.ownList);
  return {
    reviews: props.review.ownList
  }
}

Reviews.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps, { fetchOwnReviewsList })(Reviews);