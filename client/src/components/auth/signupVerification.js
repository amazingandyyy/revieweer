import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';

import {signUserUp,verifyEmailToken,signupEmailReset} from '../../actions';
import CenterCard121 from '../centerCard121';

class SignupVerification extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            loading: true,
            token: '',
            address: ''
        }
    }
    componentWillUnmount(){
        this.props.signupEmailReset();
    }
    componentWillMount(){
        const params = qs.parse(this.context.router.history.location.search.split('?')[1])
        const {token, address} = params;
        this.setState({
            token, address
        })
        this.props.signupEmailReset();
        this.props.verifyEmailToken(token, address);
    }
    componentWillReceiveProps(n, o){
        this.setState({
            loading: false
        })
    }
    handleFormSubmit(data) {
        const {token, address} = this.state;
        data.email = address;
        if (data.password == data.password2) {
            this.props.signUserUp(token, data);
        }else{
            this.renderAlert('password does not matched');
        }
    }
    renderBorder(){
        const {emailTokenGood} = this.props;
        if(emailTokenGood==null){
            return 'card'
        }
        if(emailTokenGood){
            return 'card border-success'
        }else{
            return 'card border-warning'
        }
    }
    render() {
        return (
            <CenterCard121>
                <div className={this.renderBorder()}>
                    <h4 className="card-header" />
                    <div className='card-body'>
                        {this.renderLoading()}
                    </div>
                </div>
            </CenterCard121>
        );
    }
    renderLoading(){
        const {address} = this.state;
        const {handleSubmit, emailTokenGood, authUserError,signupEmailReset} = this.props;
        if(this.state.loading){
            return <div>Loading</div>
        }else{
            return <div>
                {emailTokenGood?(<div>
                <h3 className='card-title text-center text-success'>Email Verified</h3>
                <p>Please complete Information to create.</p>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} onChange={signupEmailReset}>
                    <div className='form-group'>
                        <Field
                            name='emailAddressShow'
                            type='text'
                            component='input'
                            className='form-control form-control-lg original-disable'
                            disabled
                            readOnly='true'
                            />
                    </div>
                    <div className='form-group'>
                        <Field
                            name='firstName'
                            type='text'
                            component='input'
                            className='form-control form-control-lg'
                            placeholder='First Name'
                            required/>
                    </div>
                    <div className='form-group'>
                        <Field
                            name='lastName'
                            type='text'
                            component='input'
                            className='form-control form-control-lg'
                            placeholder='Last Name'
                            required/>
                    </div>
                    <div className='form-group'>
                        <Field
                            type='password'
                            name='password'
                            component='input'
                            className='form-control form-control-lg'
                            placeholder='your password'
                            required
                        />
                    </div>
                    
                    <div className='form-group'>
                        <Field
                            type='password'
                            name='password2'
                            component='input'
                            className='form-control form-control-lg'
                            placeholder='your password again'
                            required/>
                    </div>
                    {authUserError && <div className='alert alert-warning'>
                        {authUserError}
                    </div>}
                    <div style={{'paddingTop': '30px'}}>
                        <button type='submit' className='btn btn-lg btn-success btn-block'>Join Revieweer!</button>
                    </div>
                    <div className='form-group' style={{'fontSize': '0.7rem', 'opacity': '0.7', 'textAlign': 'center'}}>
                        <hr style={{'margin': '30px auto 25px'}}/>
                        To signup, you promise that:
                        1. You are <b>older than 18 years</b> old.&nbsp;
                        2. You have read and agreed with the <a><b>terms of use</b></a>&nbsp;
                        3. You have read and understand the <a><b>privacy policy</b></a>&nbsp;
                        4. Be nice and make this world a better to live in.
                    </div>
                    {!emailTokenGood&&<div style={{'paddingTop': '20px'}}>
                        <Link to='/signup' className='btn btn-link btn-block'>You can signup here again</Link>
                    </div>}
                </form>
                </div>)
                :(<div className='text-center '>
                    <h3 className='card-title text-center text-warning'>Verification Expired</h3>
                    <p>Verification Information sent to {address} is expired.</p>
                    <div style={{'paddingTop': '20px'}}>
                        <Link to='/signup' className='btn btn-light btn-lg btn-block'>Try Again</Link>
                    </div>
                </div>)}
            </div>
        }
    }
}

function validate(formProps) {
    const errors = {}
    if(formProps.password !== formProps.password2){
        errors.password = 'Password must match';
    }
    return errors;
}

function mapStateToProps({signupVerification}) {
    const params = qs.parse(window.location.href.split('?')[1]);
    const {address} = params;
    const { emailTokenGood, authUserError } = signupVerification;
    if(address){
        return {
            emailTokenGood,
            authUserError,
            initialValues: {
                emailAddressShow: address
            }
        }
    }else{
        return {
            emailTokenGood,
            authUserError
        }
    }
}

SignupVerification.contextTypes = {
    router: PropTypes.object
  }

export default connect(mapStateToProps, {signUserUp, verifyEmailToken,signupEmailReset})(reduxForm({
    form: 'signup',
    validate 
})(SignupVerification));