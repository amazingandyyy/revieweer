import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingBar, { showLoading, hideLoading }  from 'react-redux-loading-bar';
import { CenterCard121, SquareLoader } from '../../utils';
import {store} from '../../../app';
import { searchOneProductByURL, adminDashboardReset } from '../../../actions';

// https://www.amazon.com/dp/B0758RP5V8/ref=sxbs_sxwds-stvp_1?pf_rd_m=ATVPDKIKX0DER&pf_rd_p=3341940462&pd_rd_wg=hOnNe&pf_rd_r=2P63MYTGNHA7294C6J1Q&pf_rd_s=desktop-sx-bottom-slot&pf_rd_t=301&pd_rd_i=B0758RP5V8&pd_rd_w=UdZTt&pf_rd_i=B077N2KK27&pd_rd_r=29b40780-0aee-49f2-bd57-1ad2094c25e7&ie=UTF8&qid=1519082529&sr=1

class SearchProductForm extends React.Component {
    constructor(){
        super();
        this.status = {
            errorMsg: '',
            waitingFinished: false
        }
    }
    componentDidMount(){
        this.setState({
            errorMsg: '',
            waitingFinished: false
        })
        this.props.adminDashboardReset();
    }
    handleFormSubmit({url}) {
        if(url.search('amazon.com')!==-1 && url.search('/B0')!==-1){
            store.dispatch(showLoading('adminSearchProductBar'))
            this.props.searchOneProductByURL(url);
        }else{
            this.setState({
                errorMsg: 'URL is bad'
            })
        }
    }
    render() {
        return (
            <div className='container-fluid'>
                <CenterCard121>
                    <div className='card'>
                        <h4 className='card-header'>
                            Launch New Product (Step 1/2)
                        </h4>
                        <div className='card-body'>
                            {this.renderForm()}
                        </div>
                    </div>
                </CenterCard121>
            </div>
        );
    }
    renderForm(){
        const {handleSubmit, submitting, submitSucceeded} = this.props;
        const {errorMsg} = this.state;
        if(!submitSucceeded){
            return (
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} onChange={adminDashboardReset}>
                <div className='form-group'>
                    <label>
                        Amazon Product Link: {errorMsg&&<span className='danger-hint'>{errorMsg}</span>}
                    </label>
                    <Field
                        type='url'
                        name='url'
                        component='textarea'
                        className={`form-control ${(errorMsg)?'is-invalid':''}`}
                        placeholder='Amazon URL'
                        rows='5'
                        style={{'fontSize': '0.8rem'}}
                        disabled={submitting}
                        required
                    />
                </div>
                <div>
                    <button type='submit' disabled={submitting} className='btn btn-lg btn-light btn-block'>Fetch Product Details</button>
                </div>
            </form>
            )
        }else{
            return(<div style={{'textAlign': 'center'}}>
                <div>{this.renderLoader()}</div>
                <div>{this.renderProdudtPendingId()}</div>
                <div>{this.renderProductId()}</div>
            </div>)
        }
    }
    renderLoader(){
        if(!this.productPendingId && !this.productId) {
            return (<div>
                <SquareLoader/>
                <LoadingBar scope="adminSearchProductBar" className='revieweer-loading-bar-2' style={{'margin': '20px auto'}}/>
                <h6>Fetching product details from amazon...</h6>
            </div>)
        }
    }
    renderProdudtPendingId(){
        if(this.props.productPendingId){
            setTimeout(()=>{
                store.dispatch(hideLoading('adminSearchProductBar'))
                this.context.router.history.push(`/admin/launch/preview/${this.props.productPendingId}`);
                return <div>
                    {this.props.productPendingId}
                </div>
            }, 5000)
        }
    }
    renderProductId(){
        if(this.props.productId){
            store.dispatch(hideLoading('adminSearchProductBar'))
            this.context.router.history.push(`/pd/${this.props.productId}`);
            return <div>
                {this.props.productId}
            </div>
        }
    }
}

function mapStateToProps({adminDashboard}) {
    return {
        productPendingId: adminDashboard.productPendingId,
        productId: adminDashboard.productId,
        initialValues: {
            // url: 'https://www.amazon.com/dp/B0758RP5V8/ref=sxbs_sxwds-stvp_1?pf_rd_m=ATVPDKIKX0DER&pf_rd_p=3341940462&pd_rd_wg=hOnNe&pf_rd_r=2P63MYTGNHA7294C6J1Q&pf_rd_s=desktop-sx-bottom-slot&pf_rd_t=301&pd_rd_i=B0758RP5V8&pd_rd_w=UdZTt&pf_rd_i=B077N2KK27&pd_rd_r=29b40780-0aee-49f2-bd57-1ad2094c25e7&ie=UTF8&qid=1519082529&sr=1'
        }
    }
}

SearchProductForm.contextTypes = {
    router: PropTypes.object
}


export default connect(mapStateToProps, {searchOneProductByURL, adminDashboardReset})(reduxForm({
    form: 'SearchProductForm'
})(SearchProductForm));