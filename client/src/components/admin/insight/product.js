import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Img from 'react-image';

import { SquareLoader,CircleLoader } from '../../utils';
import { fetchInsightProducts } from '../../../actions';
import { timeAgo, getTimeAndDate } from '../../../services';


class ProductInsight extends Component {
    constructor(){
      super();
    }
    componentDidMount(){
      this.props.fetchInsightProducts()
    }
    render(){
        const {productList} = this.props;
      return(<div className='products-componant'>
          <div className='products-list-info'>
            {productList && productList.length} products posted in the past 30 days
            {!productList && <div>0 Products</div>}
          </div>
          <div className='product-list'>
          {this.renderList(productList)}
          </div>
      </div>)
    }
    renderList(productList){
        if(productList){
            console.log(productList[2])
            return productList.map(p=>{
                return(<div className='card product-item' key={p._id}>
                    <div className='row'>
											<div className='col-xs-1 col-sm-1 product-avatar'>
											<Img
												style={{'width': '40px'}}
												src={p.details.imageURL} 
												loader={
													<CircleLoader />
											}/>
											</div>
											<div className='col-xs-2 col-sm-2 product-createAt'>
												<div className='timeDate'>{getTimeAndDate(p.createdAt, {second: '2-digit'})}</div>
												<div className='timeAgo'>{timeAgo(p.createdAt)}</div>
											</div>
										</div>
                </div>)
            })
        }else{
            return <SquareLoader style={{'margin': '50px auto'}}/>
        }
    }
}

ProductInsight.contextTypes = {
  router: PropTypes.object
}


function mapStateToProps({adminInsight}) {
  return {
		productList: adminInsight.productList
	}
}

export default connect(mapStateToProps, {fetchInsightProducts})(reduxForm({
  form: 'productInsightForm'
})(ProductInsight));