import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Img from 'react-image';

import { CenterCard121, SquareLoader,CircleLoader } from '../../utils';
import { adminLaunchReset, fetchProductPreviewByProductPendingId, createOneProduct } from '../../../actions';

class productPreviewForm extends React.Component {
    constructor(){
        super();
    }
    handleFormSubmit(obj) {
        const {produdtPreviewData} = this.props;
        const mergeObj = {
            ...produdtPreviewData,
            ...obj
        }
        let finalObj = {
            ...mergeObj,
            price: Number(mergeObj.price).toFixed(2),
            cashback: Number(mergeObj.cashback).toFixed(2),
            rewards: Number(mergeObj.rewards).toFixed(2)
        }
        this.props.createOneProduct(finalObj);
    }
    componentDidMount(){
        const {productPendingId} = this.context.router.route.match.params;
        console.log(productPendingId);
        if(productPendingId){
            this.props.fetchProductPreviewByProductPendingId(productPendingId)
        }
    }
    render() {
        return (
            <CenterCard121>
                <div className='card'>
                    <h4 className='card-header'>
                        Launch New Product (Step 2/2)
                    </h4>
                    <h6 className='card-header'>
                        Product Preview
                    </h6>
                    {this.renderForm()}
                </div>
            </CenterCard121>
        );
    }
    renderForm(){
        const {handleSubmit, produdtPreviewData, submitting} = this.props;
        if(produdtPreviewData){
            return (
                <div className='text-center'>
                    <Img 
                        style={{'width': '180px', 'margin':'30px auto'}} 
                        className='card-img-top'
                        src={produdtPreviewData.imageURL} 
                        loader={<CircleLoader/>} />
                    <ul className="list-group list-group-flush text-left">
                        <li className="list-group-item">
                            <label><b>*Title:</b></label>
                            <br/>
                            {produdtPreviewData.title}
                        </li>
                        <li className="list-group-item">
                            <label><b>*Seller:</b></label>
                            <br/>
                            {produdtPreviewData.seller}
                        </li>
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} onChange={adminLaunchReset}>
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
                                max={produdtPreviewData.price}
                                step='any'
                                placeholder='price'
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
                            <label><b>*Cashback(default to 100% cashback):</b></label>
                            <br/>
                            <Field
                                type= 'number'
                                name='cashback'
                                component='input'
                                className='form-control'
                                min="0.1"
                                max={produdtPreviewData.price}
                                step='any'
                                placeholder='cashback amount'
                                disabled={submitting}
                                required
                            />
                        </li>
                        <li className="list-group-item">
                            <label><b>*Rewards(default to $4):</b></label>
                            <br/>
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
                        <div className='card-body'>
                            <button type='submit' disabled={submitting} className='btn btn-lg btn-success btn-block'>Confirm to Publish</button>
                            <Link disabled={submitting} className="btn-lg btn btn-secondary btn-block" to='/admin/launch/search'>Cancel</Link>
                        </div>
                    </form>
                    </ul>
                </div>
            )
        }
        return(<SquareLoader/>)
    }
}

productPreviewForm.contextTypes = {
    router: PropTypes.object
}


function mapStateToProps({adminLaunch}) {
    const {produdtPreviewData} = adminLaunch;
    if(produdtPreviewData){
        return {
            produdtPreviewData: produdtPreviewData,
            initialValues: {
                price:  produdtPreviewData.price,
                rewards: 4,
                cashback: produdtPreviewData.price,
                notes: ''
            }
        }
    }
    return {
        produdtPreviewData: null
    }
}

export default connect(mapStateToProps, {
    fetchProductPreviewByProductPendingId, adminLaunchReset,createOneProduct
})(reduxForm({
    form: 'productPreviewForm'
})(productPreviewForm));




// const obj = {
//     imageURL:'https://images-na.ssl-images-amazon.com/images/I/413-cGyC8dL._AC_US218_.jpg',
//     link:'https://www.amazon.com/Sabrent-5-25-INCH-Converter-Activity-USB-DS12/dp/B0758RP5V8/ref=sr_1_1/145-2769016-6952939?ie=UTF8&qid=1519088138&sr=8-1&keywords=B0758RP5V8',
//     price:22.99,
//     productId:'B0758RP5V8',
//     seller:'Sabrent',
//     title:'Sabrent USB 3.0 TO SSD / SATA / IDE 2.5 / 3.5 / 5.25-INCH Hard Drive Converter With UL Power Supply & LED Activity Lights [10TB Support] (USB-DS12)'
// }