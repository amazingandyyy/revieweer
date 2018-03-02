import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getTimeAndDate} from '../../services';
import { updateReviewProgress } from '../../actions';

class Visited extends Component {
  componentDidMount(){
  }
  render(){
    return <div className='card'>
      <div className='review-step'>
        Visit
        {this.renderCompletion()}
      </div>
      <div className='card-body'>
        {this.renderContent()}
      </div>
    </div>
  }
  renderCompletion(){
    const {review} = this.props;
    const {visited} = review.payload;
    if(visited && (visited.at || visited.last)){
      const time = visited.last || visited.at;
      return (<span className='completion'>
        <i className="fas fa-check"></i>visited at 
        <span>{getTimeAndDate(time)}</span>
      </span>)
    }else{
      return (<span className='completion not-yet'>
        <i className="fas fa-minus"></i>Not completed yet
      </span>)
    }
  }
  renderContent(){
    const {review} = this.props;
    const {product} = review;
    return(<div>
      <span>{`Visit product on `}</span><a onClick={this.takeAction.bind(this)} href={product.details.link} target='_blank'><div className='bubble-tag highlight'><i className="fas fa-link"></i>website</div></a>
      {product.benefits.notes && <div><span>{`Follow instructions: `}</span><span className='bubble-tag'>{product.benefits.notes}</span></div>}
    </div>)
  }
  takeAction(){
    const reviewId = this.props.review._id;
    const data = {
      type: 'visited',
      payload: {
        timestamp: new Date()
      }
    }
    this.props.updateReviewProgress(reviewId,data);
  }
}

function mapStateToProps(props) {
  return {
    review: props.review.details
  }
}

export default connect(mapStateToProps, {updateReviewProgress})(Visited);