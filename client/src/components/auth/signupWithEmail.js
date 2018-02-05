import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signupWithEmail, signupWithEmailReset } from '../../actions';
import CenterCard121 from '../CenterCard121';

class SignupWithEmail extends Component {
    constructor(){
        super();
    }
    componentWillMount(){
        this.props.signupWithEmailReset();
    }
    componentWillUnmount(){
        this.props.signupWithEmailReset();
    }
    componentDidUpdate(){
        console.log(this.context.router);
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
                    Request Your Early Access
                </h4>
                <img src='/assets/logo-sm.png' style={{'margin': '10px auto', 'transform': 'scale(0.6)'}}/>
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
                <h4 className="alert-heading">Awesome! Check Email!</h4>
                Aww yeah, registration email is sent to <b>{emailSentTo}</b>
                <hr/>Please check your inbox or trash/junk box. The verification may be expired in 60 minutes.
            </div>)
        }else{
            return(<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} onChange={signupWithEmailReset}>
                <div className="form-group">
                    <label>
                        Email(username): {emailStateError&&<span className='danger-hint'>{emailStateError}</span>}
                    </label>
                    <Field
                        type= 'email'
                        name="email"
                        component="input"
                        className={`form-control form-control-lg ${(emailStateError)?'is-invalid':''}`}
                        placeholder="sample@mail.com"
                    />
                </div>
                {this.renderAlert()}
                <div style={{'paddingTop': '30px'}}>
                    <button type="submit" disabled={submitting} className="btn btn-lg btn-light btn-block">Send Me Registration Email</button>
                </div>
                <div style={{'paddingTop': '20px'}}>
                    <Link to='/signin' className="btn btn-link btn-block">Already have an account? signin here</Link>
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