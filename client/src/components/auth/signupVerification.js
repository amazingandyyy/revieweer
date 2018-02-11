import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';

import {signUserUp,verifyEmailToken} from '../../actions';
import CenterCard121 from '../CenterCard121';
import RevieweerLogo from '../logo';

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
    componentWillMount(){
        const params = qs.parse(this.context.router.history.location.search.split('?')[1])
        const {token, address} = params;
        this.setState({
            token, address
        })
        this.props.verifyEmailToken(token, address);
    }
    componentWillReceiveProps(n, o){
        this.setState({
            loading: false
        })
    }
    handleFormSubmit(data) {
        const {token, address} = this.state;
        data.email = address
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
                    <RevieweerLogo />
                    <div className='card-body'>
                        {this.renderLoading()}
                    </div>
                </div>
            </CenterCard121>
        );
    }
    renderLoading(){
        const {address} = this.state;
        const {handleSubmit, emailTokenGood} = this.props;
        if(this.state.loading){
            return <div>Loading</div>
        }else{
            return <div>
                {emailTokenGood?(<div>
                <h3 className='card-title text-center text-success'>Email Verified</h3>
                <p>Please complete infomation to create your new Reveweer account of {address}.</p>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <div className='form-group'>
                        <label>First name:</label>
                        <Field
                            name='firstName'
                            type='text'
                            component='input'
                            className='form-control form-control-lg'
                            placeholder='First Name'
                            required/>
                    </div>
                    <div className='form-group'>
                        <label>Last name:</label>
                        <Field
                            name='lastName'
                            type='text'
                            component='input'
                            className='form-control form-control-lg'
                            placeholder='Last Name'
                            required/>
                    </div>
                    <div className='form-group'>
                        <label>Password:</label>
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
                        <label>Comfirm Password:</label>
                        <Field
                            type='password'
                            name='password2'
                            component='input'
                            className='form-control form-control-lg'
                            placeholder='your password again'
                            required/>
                    </div>
                    <div style={{'paddingTop': '30px'}}>
                        <button type='submit' className='btn btn-lg btn-success btn-block'>Lets Do It!</button>
                    </div>
                    {!emailTokenGood&&<div style={{'paddingTop': '20px'}}>
                        <Link to='/signup' className='btn btn-link btn-block'>You can signup here again</Link>
                    </div>}
                </form>
                </div>)
                :(<div className='text-center '>
                    <h3 className='card-title text-center text-warning'>Verification Expired</h3>
                    <p>Verification infomation sent to {address} is expired.</p>
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
    const { emailTokenGood } = signupVerification;
    return {
        emailTokenGood
    }
}

SignupVerification.contextTypes = {
    router: PropTypes.object
  }

export default connect(mapStateToProps, {signUserUp, verifyEmailToken})(reduxForm({
    form: 'signup',
    validate 
})(SignupVerification));