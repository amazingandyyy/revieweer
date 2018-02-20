import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recaptcha from '../../recaptcha';

import { searchOneProduct, adminDashboardReset } from '../../../actions';

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
        if(url.search('amazon.com')!==-1&&url.search('/B0')!==-1){
            this.props.searchOneProduct(url);
        }else{
            this.setState({
                errorMsg: 'URL is bad'
            })
        }
    }
    render() {
        return (
            <div className='container'>
                {this.renderForm()}
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
                        type= 'url'
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
                <div>Verify Google Recaptcha</div>
                <Recaptcha
                    verify={this.recaptchaVerifyCallback.bind(this)}
                />
            </div>)
        }
    }
    recaptchaVerifyCallback(){
        this.context.router.history.push(`/admin/launch/preview/${this.props.produdtPendingId}`);
    }
}

function mapStateToProps({adminDashboard}) {
    return {
        produdtPendingId: adminDashboard.produdtPendingId,
        initialValues: {
            url: 'https://www.amazon.com/dp/B0758RP5V8/ref=sxbs_sxwds-stvp_1?pf_rd_m=ATVPDKIKX0DER&pf_rd_p=3341940462&pd_rd_wg=hOnNe&pf_rd_r=2P63MYTGNHA7294C6J1Q&pf_rd_s=desktop-sx-bottom-slot&pf_rd_t=301&pd_rd_i=B0758RP5V8&pd_rd_w=UdZTt&pf_rd_i=B077N2KK27&pd_rd_r=29b40780-0aee-49f2-bd57-1ad2094c25e7&ie=UTF8&qid=1519082529&sr=1'
        }
    }
}

SearchProductForm.contextTypes = {
    router: PropTypes.object
}


export default connect(mapStateToProps, {searchOneProduct, adminDashboardReset})(reduxForm({
    form: 'SearchProductForm'
})(SearchProductForm));