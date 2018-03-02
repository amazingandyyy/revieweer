import React, {Component} from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {getTimeAndDate} from '../../services';

import { updateReviewProgress } from '../../actions';
const INITIAL_STATE = {
  editting: false,
  loading: false,
  errorMsg: null
}
class Ordered extends Component {
  constructor(){
    super();
    this.state=INITIAL_STATE;
  }
  render(){
    return <div className='card reviewCardForm'>
      <div className='review-step'>
        Order
        {this.renderCompletion()}
      </div>
      <div className='card-body'>
        {this.renderContent()}
      </div>
    </div>
  }
  renderCompletion(){
    const {review} = this.props;
    const {ordered} = review.payload;
    if(ordered && ordered.at){
      const time = new Date(ordered.at);
      return (<span className='completion'>
        <i className="fas fa-check"></i>updated at 
        <span className='timestamp'>{getTimeAndDate(time)}</span>
      </span>)
    }else{
      return (<span className='completion not-yet'>
        <i className="fas fa-minus"></i>Not completed yet
      </span>)
    }
  }
  resetError(){
    this.setState({
      errorMsg: null,
      loading: false
    })
  }
  renderContent(){
    const {handleSubmit,submitting, review} = this.props;
    const {editting} = this.state;
    if(review.payload && review.payload.ordered && review.payload.ordered.at){
      return(<form onChange={this.resetError.bind(this)} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className='form-group' style={{'marginBottom': '6px'}}>
        <span style={{'marginRight': '10px'}}>Your order number:</span>
          <Field
            onClick={this.resetError.bind(this)}
            type= 'text'
            name='orderNumber'
            component='input'
            className='form-control'
            placeholder='Ex. 112-9354930-1677777'
            required
            maxlength={19}
            disabled={!editting}
          />
        </div>
        {!editting && <div onClick={this.edit.bind(this)} className='btn btn-secondary'>Edit</div>}
        {editting && 
          <span>
            <div disabled={submitting} onClick={this.edit.bind(this)} className='btn btn-secondary'>Cancel</div>
            {this.renderUpdateButton()}
          </span>
        }
    </form>)
    }else{
      return (<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className='form-group' style={{'marginBottom': '6px'}}>
        <span style={{'marginRight': '10px'}}>Your order number:</span>
          <Field
            onClick={this.resetError.bind(this)}
            type= 'text'
            name='orderNumber'
            component='input'
            className='form-control'
            placeholder='Ex. 112-9354930-1677777'
            required
            maxlength={19}
            disabled={false}
          />
        </div>
        {this.renderAddOrderButton()}
    </form>)
    }
  }
  renderAddOrderButton(){
    const {dirty, submitting} = this.props;
    const {loading, errorMsg} = this.state;
    if(!loading){
      return (
        <span>
          <button disabled={!dirty||submitting} type='submit' className='btn btn-success'>Add Order Number</button>
        </span>
      )
    }else{
      if(errorMsg){
        return <button className='btn btn-warning'>{errorMsg}</button>
      }else{
        return <button disabled={true} className='btn btn-success'>Updating...</button>
      }
    }
  }
  renderUpdateButton(){
    const {dirty, submitting} = this.props;
    const {loading, errorMsg} = this.state;
    if(!loading){
      return (
        <span>
          <div onClick={this.deleteOrder.bind(this)} disabled={submitting} className='btn btn-danger'>Delete</div>
          <button disabled={!dirty||submitting} type='submit' className='btn btn-success'>Update</button>
        </span>
      )
    }else{
      if(errorMsg){
        return <div className='btn btn-warning'>{errorMsg}</div>
      }else{
        return <div disabled={true} className='btn btn-success'>Updating...</div>
      }
    }
  }
  deleteOrder(){
    const reviewId = this.props.review._id;
    const data = {
      type: 'ordered',
      payload: {
        delete: true
      }
    }
    let r = window.confirm(`Are you sure to delete this order infomation? It's not reversible.`)
    if(r==true){
      this.props.updateReviewProgress(reviewId,data);
    }else{
      window.location.reload(true);
    }
  }
  edit(){
    this.props.reset();
    this.setState({
      editting: !this.state.editting,
      errorMsg: null,
      loading: false
    })
  }
  handleFormSubmit(obj){
    const reviewId = this.props.review._id;
    const orderNumber = obj.orderNumber.trim();
    const regex = /^(\d{3})-(\d{7})-(\d{7})$/g;
    if(regex.exec(orderNumber) !== null){
      const data = {
        type: 'ordered',
        payload: {
          timestamp: new Date(),
          orderNumber: orderNumber
        }
      }
      this.setState({ loading: true })
      setTimeout(()=>{
        this.props.reset();
        return this.props.updateReviewProgress(reviewId,data);
      }, 800)
    }else{
      this.setState({ loading: true })
      setTimeout(()=>{
        this.setState({ errorMsg: 'Order Number is Not Valid' })
        this.props.reset();
      }, 800)
    }
  }
}

function mapStateToProps(props) {
  if(props.review.details && props.review.details.payload.ordered && props.review.details.payload.ordered.orderNumber){
    return {
      review: props.review.details,
      initialValues: {
        orderNumber: props.review.details.payload.ordered.orderNumber
      }
    }
  }else{
    return {
      review: props.review.details
    }
  }
}

export default connect(mapStateToProps, {updateReviewProgress})(reduxForm({
  form: 'reviewOrdered'
})(Ordered));
