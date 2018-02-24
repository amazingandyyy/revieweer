import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getOneproduct, updateOneProduct, deleteOneProduct } from '../../actions';
import { CenterCard121 } from '../utils';

class ProductEdit extends Component {
  componentDidMount(){
    const {productId} = this.context.router.route.match.params;
    if(!productId) return this.context.router.history.push('/explore');
    this.props.getOneproduct(productId);
  }
  render() {
    return (
      <CenterCard121>
          <div className='card' style={{'marginBottom': '50px'}}>
              <h4 className='card-header'>
                  Product
              </h4>
              {this.renderProduct()}
          </div>
      </CenterCard121>
    );
  }
  handleFormSubmit(obj){
    let finalObj = {
      details: {
        price: Number(obj.price).toFixed(2),
      },
      benefits: {
        cashback: Number(obj.cashback).toFixed(2),
        notes: obj.notes,
          rewards: Number(obj.rewards).toFixed(2),
      },
      productId: this.props.productId
    }
    this.props.updateOneProduct(this.props._id,finalObj);
  }
  deleteProduct(){
    let r = window.confirm(`Are sure to delete product(${this.props.productId})? It cannot undo.`)
    if(r==true){
      this.props.deleteOneProduct(this.props._id);
    }else{
      window.location.reload(true);
    }
  }
  renderProduct(){
    const {details, benefits, isAdmin, productId} = this.props;
    const {handleSubmit, submitting} = this.props;
    if(details){
      return <div>
        <div className='text-center'>
            <img style={{'width': '70%', 'margin':'auto'}} className='card-img-top' src={details.imageURL} alt={details.title}/>
            <ul className="list-group list-group-flush text-left">
                <li className="list-group-item">
                    <label><b>Title:</b></label>
                    <br/>
                    {details.title}
                </li>
                <li className="list-group-item">
                    <label><b>Seller:</b></label>
                    <br/>
                    {details.seller}
                </li>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <li className="list-group-item">
                  <label><b>*Price(USD):</b><br/>
                      <small>Be aware of the <b>potential discounts</b></small>
                  </label>
                  <br/>
                  <Field
                      type= 'number'
                      name='price'
                      component='input'
                      className='form-control'
                      min="0.1"
                      max={details.price}
                      step='any'
                      placeholder='price'
                      disabled={submitting}
                      required
                  />
                </li>
                <li className="list-group-item">
                  <label><b>*Cashback(default to 100% cashback):</b></label>
                  <br/>
                    <Field
                      type= 'number'
                      name='cashback'
                      component='input'
                      className='form-control'
                      min="0.1"
                      max={benefits.price}
                      step='any'
                      placeholder='Buy XL Size, Blue color.'
                      disabled={submitting}
                      required
                  />
                </li>
                <li className="list-group-item">
                  <label><b>Notes/Instructions:</b><br/>
                      <small>Fill out <b>{`'None'`}</b> if no instructions are needed.</small>
                  </label>
                  <br/>
                  <Field
                      type= 'text'
                      name='notes'
                      component='textarea'
                      className='form-control'
                      placeholder='Buy XL Size, Blue color.'
                      rows='3'
                      disabled={submitting}
                  />
                </li>
                <li className="list-group-item">
                  <Field
                    type= 'number'
                    name='rewards'
                    component='input'
                    className='form-control'
                    placeholder='Buy XL Size, Blue color.'
                    disabled={submitting}
                    required
                  />
                </li>
                {isAdmin&&<li className="list-group-item">
                  <button type='submit' disabled={submitting} className='btn btn-lg btn-primary btn-block'>Save Change</button>
                  <Link to={`/pd/${productId}`} className='btn btn-lg btn-secondary btn-block'>Cancel</Link>
                </li>}
                </form>
                {isAdmin&&<li className="list-group-item">
                <button className='btn btn-lg btn-danger btn-block' onClick={this.deleteProduct.bind(this)}>Delete This Product</button>
                </li>}
            </ul>
        </div>
      </div>
    }else{
      return <div className='text-center'>
        <div>No Product</div>
      </div>
    }
  }
}

ProductEdit.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps({auth,product}) {
  const {item} = product;
  if(item){
    return {
      productId: item.productId,
      details: item.details,
      benefits: item.benefits,
      _id: item._id,
      isAdmin: auth.isAdmin,
      initialValues: {
        price:  item.details.price,
        rewards: item.benefits.rewards,
        cashback: item.benefits.cashback,
        notes: item.benefits.notes || ''
    }
    }
  }else{
    return {
      product: null,
      isAdmin: auth.isAdmin
    }
  }
}

export default connect(mapStateToProps, {
  getOneproduct,
  updateOneProduct,
  deleteOneProduct
})(reduxForm({
  form: 'productEditForm'
})(ProductEdit));
