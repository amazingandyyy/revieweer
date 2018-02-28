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
    console.log('review', this.props.review);
    return <div className='admin-component'>
      {this.renderProgress()}
    </div>
  }
  renderProgress(){
    return(<div className='row'>
      <div className='col-sm-2'></div>
      <div className='col-sm-10'>
        
      </div>
      <div className='col-sm-2'></div>
    </div>)
  }
}

function mapStateToProps(props) {
  return {
    review: props.review.details
  }
}

export default connect(mapStateToProps, {fetchOneReview})(Review);