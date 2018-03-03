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
        <h1>{p._id}</h1>
      </div>
    </div>)
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