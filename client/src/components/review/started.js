import React, {Component} from 'react';
import { connect } from 'react-redux';

import { updateReviewProgressAtStarted } from '../../actions';

class Started extends Component {
  componentDidMount(){
    
  }
  render(){
    return <div className='card'>
      <div className='card-body'>
        {this.renderContent()}
      </div>
    </div>
  }
  renderContent(){
    const {review} = this.props;
    const {product} = review;
    const {started} = review.payload;
    if(started){
      return (<div>{started.at}</div>)
    }else{
      return(<div>Order on <a href={product.details.link} target='_blank'>Amazon</a></div>)
    }
  }
}

function mapStateToProps(props) {
  return {
    review: props.review.details
  }
}

export default connect(mapStateToProps, {updateReviewProgressAtStarted})(Started);