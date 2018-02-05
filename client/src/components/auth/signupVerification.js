import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'querystring';

import {signUserUp,verifyEmailToken} from '../../actions';
import CenterCard363 from '../centerCard363';

class SignupVerification extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            loading: true
        }
    }
    componentWillMount(){
        const {token, address} = qs.decode(this.context.router.history.location.search.split('?')[1]);
        this.props.verifyEmailToken(token, address);
    }
    componentWillReceiveProps(n, o){
        this.setState({
            loading: false
        })
    }
    renderAlert(error) {
        let errorMsg = error || this.props.errorMsg
        if (this.props.errorMsg) {
            return (
                <div className='alert alert-warning'>
                    <strong>Oops!
                    </strong> {errorMsg}
                </div>
            )
        }
    }
    handleFormSubmit(data) {
        const {token, address} = qs.decode(this.context.router.history.location.search.split('?')[1]);
        data.email = address
        if (data.password == data.password2) {
            this.props.signUserUp(token, data);
        }else{
            this.renderAlert('password does not matched');
        }
    }
    render() {
        const {emailTokenGood} = this.props;
        return (
            <CenterCard363>
                <div className={emailTokenGood?'card border-success':'card border-warning'}>
                <img src='https://raw.githubusercontent.com/amazingandyyy/revieweer/master/assets/logo-sm.png?token=AHhU9OpdQNvrzw1l_lzWDzXLfKL1Biusks5af9sIwA%3D%3D' style={{'margin': '20px auto 0px', 'transform': 'scale(0.6)'}}/>
                <div className='card-body'>
                {this.renderLoading()}
                </div>
                </div>
            </CenterCard363>
        );
    }
    renderLoading(){
        const {address} = qs.decode(this.context.router.history.location.search.split('?')[1]);
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
                {this.renderAlert()}
                <div style={{'paddingTop': '30px'}}>
                    <button type='submit' className='btn btn-lg btn-light btn-block'>Sign Up</button>
                </div>
                <div style={{'paddingTop': '20px'}}>
                    <Link to='/signup' className='btn btn-link btn-block'>You can signup here again</Link>
                </div>
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

function mapStateToProps({auth, state}) {
    return {
        errorMsg: auth.error,
        emailTokenGood: state.emailTokenGood
    }
}

SignupVerification.contextTypes = {
    router: PropTypes.object
  }

export default connect(mapStateToProps, {signUserUp, verifyEmailToken})(reduxForm({
    form: 'signup',
    validate 
})(SignupVerification));