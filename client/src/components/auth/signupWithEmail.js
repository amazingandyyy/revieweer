import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signupWithEmail, signupWithEmailReset } from '../../actions';
import CenterCard121 from '../CenterCard121';
import RevieweerLogo from '../logo';

class SignupWithEmail extends React.Component {
    constructor(){
        super();
    }
    componentWillMount(){
        this.props.signupWithEmailReset();
    }
    componentWillUnmount(){
        this.props.signupWithEmailReset();
    }
    renderAlert(error) {
        let errorMsg = error || this.props.errorMsg
        if (this.props.errorMsg) {
            return (
                <div className="alert alert-warning">
                    <strong>Oops!
                    </strong> {errorMsg}
                </div>
            )
        }
    }
    handleFormSubmit({email}) {
        this.props.signupWithEmail(email);
    }
    render() {
        return (
            <CenterCard121>
                <div className='card'>
                <h4 className="card-header">
                    Join
                </h4>
                <RevieweerLogo />
                <div className="card-body">
                    {this.renderForm()}
                </div>
                </div>
            </CenterCard121>
        );
    }
    renderForm(){
        const {handleSubmit,emailStateError,signupWithEmailReset,emailSentTo, submitting} = this.props;
        if(emailSentTo && emailSentTo.length > 1){
            return(<div className='alert alert-success'>
                <h4 className="alert-heading">Almost there!</h4>
                Verification email is sent to <b>{emailSentTo}</b>
                <hr/>Please check your inbox or trash/junk box. The activation code will be expired in 60 minutes...
            </div>)
        }else{
            return(<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} onChange={signupWithEmailReset}>
                <div className="form-group">
                    <label>
                        Email: {emailStateError&&<span className='danger-hint'>{emailStateError}</span>}
                    </label>
                    <Field
                        type= 'email'
                        name="email"
                        component="input"
                        className={`form-control form-control-lg ${(emailStateError)?'is-invalid':''}`}
                        placeholder="your email adddress"
                        required
                    />
                </div>
                {this.renderAlert()}
                <div>
                    <button type="submit" disabled={submitting} className="btn btn-lg btn-light btn-block">Send Me Activation</button>
                </div>
                <div style={{'paddingTop': '20px'}}>
                    <Link to='/signin' className="btn btn-link btn-block">Have an account? signin here</Link>
                </div>
            </form>)
        }
    }
}

function mapStateToProps({signupWithEmail}) {
    const {emailStateError, emailSentTo} = signupWithEmail;
    return {
        emailStateError,
        emailSentTo
    }
}

SignupWithEmail.contextTypes = {
    router: PropTypes.object
}

export default connect(mapStateToProps, {signupWithEmail, signupWithEmailReset})(reduxForm({
    form: 'SignupWithEmail'
})(SignupWithEmail));