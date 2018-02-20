import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { searchOneProduct, adminDashboardReset } from '../../../actions';

// https://www.amazon.com/dp/B0758RP5V8/ref=sxbs_sxwds-stvp_1?pf_rd_m=ATVPDKIKX0DER&pf_rd_p=3341940462&pd_rd_wg=hOnNe&pf_rd_r=2P63MYTGNHA7294C6J1Q&pf_rd_s=desktop-sx-bottom-slot&pf_rd_t=301&pd_rd_i=B0758RP5V8&pd_rd_w=UdZTt&pf_rd_i=B077N2KK27&pd_rd_r=29b40780-0aee-49f2-bd57-1ad2094c25e7&ie=UTF8&qid=1519082529&sr=1

class SearchProductForm extends React.Component {
    constructor(){
        super();
    }
    handleFormSubmit({url}) {
        if(url.search('amazon.com')!==-1||url.search('/B0')!==-1){
            this.props.searchOneProduct(url);
        }else{
            console.log('bad url')
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
        const {handleSubmit,produdtPendingId, submitting} = this.props;
        if(!produdtPendingId){
            return (
                <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} onChange={adminDashboardReset}>
                <div className="form-group">
                    <label> URL: </label>
                    <Field
                        type= 'url'
                        name="url"
                        component="input"
                        className='form-control form-control-lg'
                        placeholder="Amazon URL"
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={submitting} className="btn btn-lg btn-light btn-block">Preview Publishing</button>
                </div>
            </form>
            </div>
            )
        }else{
            return(<div>
                <Link to={`/admin/launch/preview/${produdtPendingId}`}>{produdtPendingId}</Link>
            </div>)
        }
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