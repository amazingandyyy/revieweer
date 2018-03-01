import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchOneReview } from '../../actions';
import ProductPreview from '../explore/product.preview';
import Visited from './visited';
import Ordered from './ordered';

class Review extends Component {
  componentDidMount(){
    const {reviewId} = this.context.router.route.match.params;
    if(!reviewId) return this.context.router.history.push('/explore');
    this.props.fetchOneReview(reviewId);
  }
  render(){
    return <div className='review-component container-fluid'>
      {this.props.review&&this.renderProgress()}
    </div>
  }
  renderProgress(){
    return(<div className='row'>
      <div className='col-sm-12 col-md-4'>
        <ProductPreview data={this.props.review.product}/>
      </div>
      <div className='col-sm-12 col-md-8'>
        <Visited/>
        <Ordered/>
      </div>
      </div>)
  }

}

function mapStateToProps(props) {
  console.log('review: ', props.review.details);
  return {
    review: props.review.details
  }
}

export default connect(mapStateToProps, {fetchOneReview})(Review);


export const progressStatus = [
  'viewed','visited', 'ordered','reviewed', 'payouted', 'finished'
];