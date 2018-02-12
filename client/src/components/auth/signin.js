import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {signUserIn,signinReset} from '../../actions';
import CenterCard121 from '../CenterCard121';
import RevieweerLogo from '../logo';

class Signin extends Component {
    componentWillMount(){
        this.props.signinReset();
    }
    componentWillUnmount(){
        this.props.signinReset();
    }
    handleFormSubmit(d) {
        this.props.signUserIn(d);
        this.props.change('password', '');
    }
    render() {
        const {handleSubmit, emailStateError, passwordError, normalError, signinReset} = this.props;
        return (
            <CenterCard121>
                <div className='card'>
                    <h4 className="card-header">
                        Welcome Back
                    </h4>
                    <RevieweerLogo />
                    <div className="card-body">
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} onChange={signinReset}>
                        <div className="form-group">
                            <label>
                                Email: {emailStateError&&<span className='danger-hint'>{emailStateError}</span>}
                            </label>
                            <Field
                                type= 'email'
                                name="email"
                                component="input"
                                className={`form-control form-control-lg ${(emailStateError)?'is-invalid':''}`}
                                placeholder="adddress"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Password: {passwordError&&<span className='danger-hint'>{passwordError}</span>}
                            </label>
                            <Field
                                type= 'password'
                                name="password"
                                component="input"
                                className={`form-control form-control-lg ${(passwordError)?'is-invalid':''}`}
                                placeholder="password"
                                required
                            />
                        </div>
                        {normalError && <div className='alert alert-warning'>
                            {normalError}
                        </div>}
                        <div style={{'paddingTop': '30px'}}>
                            <button type="submit" className="btn btn-lg btn-light btn-block">Sign in</button>
                        </div>
                        <div style={{'paddingTop': '20px'}}>
                            <Link to='/signup' className="btn btn-link btn-block">{"Don't have an account? Signup here."}</Link>
                        </div>
                    </form>
                    <div className='card-bottom-balancer'></div>
                    </div>
                </div>
            </CenterCard121>
        );
    }
}

function mapStateToProps({signin}) {
    const {emailStateError, passwordError, normalError} = signin;
    return {
        emailStateError, passwordError, normalError
    }
}

export default connect(mapStateToProps, {signinReset,signUserIn})(reduxForm({
    form: 'signin'
})(Signin));