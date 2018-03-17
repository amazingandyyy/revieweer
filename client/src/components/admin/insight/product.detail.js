import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Detail extends Component {
    constructor(){
        super();
    }
    render(){
    const p = this.props.product;
    console.log(p);
      return(<div className='row product-detail'>
      <div className='column'>
        <div className='reviewer-list'>
            {this.renderReviewers(p.reviews)}
        </div>
      </div>
    </div>)
    }
    renderReviewers(reviews){
        return reviews.map(r=>{
            if(r && r.user && r.user.avatar){
                return(<div key={r._id} className='reviewer-item'>
                <div className='reviewer-profile'>
                    <img src={r.user.avatar} />
                </div>
                <div className='review-details' onClick={()=>this.context.router.history.push(`/review/${r._id}`)}>
                
                </div>
            </div>)
            }
        })
    }
}

Detail.contextTypes = {
    router: PropTypes.object
}

function mapStateToProps(props) {
    return {}
}

Detail.propTypes = {
	product: PropTypes.object.isRequired
}
export default connect(mapStateToProps, null)(Detail);