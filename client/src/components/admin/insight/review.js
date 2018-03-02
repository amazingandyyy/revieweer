import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SquareLoader } from '../../utils';
import { fetchInsightReviews } from '../../../actions';

class ReviewInsight extends Component {
    constructor(){
      super();
    }
    componentDidMount(){
      this.props.fetchInsightReviews()
    }
    render(){
      return(<div>
          Reviews
          <br/>
          {this.renderList()}
      </div>)
    }
    renderList(){
        const {reviewList} = this.props;
        if(reviewList){
            return reviewList.map(p=>{
                return(<div key={p._id}>
                    {p._id}
                </div>)
            })
        }else{
            return <SquareLoader style={{'margin': '50px auto'}}/>
        }
    }
}

ReviewInsight.contextTypes = {
  router: PropTypes.object
}


function mapStateToProps({adminInsight}) {
  return {
		reviewList: adminInsight.reviewList
	}
}

export default connect(mapStateToProps, {fetchInsightReviews})(reduxForm({
  form: 'reviewInsightForm'
})(ReviewInsight));