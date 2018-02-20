import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { adminDashboardReset,fetchProeuctPreview } from '../../../actions';

class productPreviewForm extends React.Component {
    constructor(){
        super();
    }
    handleFormSubmit(obj) {
        console.log(obj);
    }
    componentDidMount(){
        const {productPendingId} = this.context.router.route.match.params;
        if(productPendingId){
            this.props.fetchProeuctPreview(productPendingId)
        }
    }
    render() {
        return (
            <div className='row'>
                {this.renderForm()}
            </div>
        );
    }
    renderForm(){
        const {handleSubmit, produdtPreviewData, submitting} = this.props;
        if(produdtPreviewData){
            return (
                <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} onChange={adminDashboardReset}>
                <div className="form-group">
                    <img src={produdtPreviewData.imageURL} />
                    <label> URL: </label>
                    <Field
                        type= 'text'
                        name="title"
                        component="input"
                        className='form-control form-control-lg'
                        placeholder="title"
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={submitting} className="btn btn-lg btn-light btn-block">Publish</button>
                </div>
            </form>
            </div>
            )
        }else{
            return(<div>
                Loading...
            </div>)
        }
    }
}

function mapStateToProps({adminDashboard}) {
    const {produdtPreviewData} = adminDashboard;
    if(produdtPreviewData){
        return {
            produdtPreviewData: produdtPreviewData,
            initialValues: {
                title:  produdtPreviewData.title
            }
        }
    }
    return {
        produdtPreviewData: null
    }
}

export default connect(mapStateToProps, {fetchProeuctPreview, adminDashboardReset})(reduxForm({
    form: 'productPreviewForm'
})(productPreviewForm));




// const obj = {
//     imageURL:"https://images-na.ssl-images-amazon.com/images/I/413-cGyC8dL._AC_US218_.jpg",
//     link:"https://www.amazon.com/Sabrent-5-25-INCH-Converter-Activity-USB-DS12/dp/B0758RP5V8/ref=sr_1_1/145-2769016-6952939?ie=UTF8&qid=1519088138&sr=8-1&keywords=B0758RP5V8",
//     price:22.99,
//     productId:"B0758RP5V8",
//     seller:"Sabrent",
//     title:"Sabrent USB 3.0 TO SSD / SATA / IDE 2.5 / 3.5 / 5.25-INCH Hard Drive Converter With UL Power Supply & LED Activity Lights [10TB Support] (USB-DS12)"
// }