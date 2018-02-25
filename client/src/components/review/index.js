import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchOneReview } from '../../actions';

class Review extends Component {
  componentDidMount(){
    const {reviewId} = this.context.router.route.match.params;
    if(!reviewId) return this.context.router.history.push('/explore');
    this.props.fetchOneReview(reviewId);
  }
  render(){
    console.log(this.props.review);
    return <div className='admin-component'>
    </div>
  }
}

function mapStateToProps(props) {
  return {
    review: props.review.details
  }
}

export default connect(mapStateToProps, {fetchOneReview})(Review);