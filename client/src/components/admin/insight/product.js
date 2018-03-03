import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SquareLoader } from '../../utils';
import { fetchInsightProducts } from '../../../actions';

class ProductInsight extends Component {
    constructor(){
      super();
    }
    componentDidMount(){
      this.props.fetchInsightProducts()
    }
    render(){
      return(<div className='products-componant'>
          Products
          <br/>
          {this.renderList()}
      </div>)
    }
    renderList(){
        const {productList} = this.props;
        if(productList){
            console.log(productList[2])
            return productList.map(p=>{
                return(<div key={p._id}>
                    {p.productId}
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