import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QRCode from 'qrcode';

import { SquareLoader } from '../../utils';
import { fetchInsightReviews } from '../../../actions';

class ReviewInsight extends Component {
	constructor(){
		super();
		this.state = {
			qrcode: ''
		}
	}
	componentDidMount(){
		this.props.fetchInsightReviews();
		QRCode.toDataURL('https://www.revieweer.com')
			.then(url => {
				this.setState({qrcode: url})
			})
			.catch(err => {
				console.error(err)
			})
	}
	render(){
		return(<div className='reviews-componant'>
				Reviews
				<br/>
				{this.renderList()}
			</div>)
	}
	renderList(){
			const {reviewList} = this.props;
			if(reviewList){
					console.log('reviewList[0]', reviewList[0]);
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