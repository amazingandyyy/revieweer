import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signupWithEmail } from '../../actions';
import CenterCard363 from '../centerCard363';

class SignupWithEmail extends Component {
    constructor(){
        super();
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
        const {handleSubmit} = this.props;
        return (
            <CenterCard363>
                <div className='card'>
                <h4 className="card-header">
                    What your email address
                </h4>
                <img src='https://raw.githubusercontent.com/amazingandyyy/revieweer/master/assets/logo-sm.png?token=AHhU9OpdQNvrzw1l_lzWDzXLfKL1Biusks5af9sIwA%3D%3D' style={{'margin': '10px auto', 'transform': 'scale(0.6)'}}/>
                <div className="card-body">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <div className="form-group">
                        <label>Email:</label>
                        <Field
                            type='email'
                            name="email"
                            component="input"
                            className="form-control form-control-lg"
                            placeholder="username(email)"
                            required
                        />
                    </div>
                    {this.renderAlert()}
                    <div style={{'paddingTop': '30px'}}>
                        <button type="submit" className="btn btn-lg btn-light btn-block">Send Me Registration Email</button>
                    </div>
                    <div style={{'paddingTop': '20px'}}>
                        <Link to='/signin' className="btn btn-link btn-block">Already had an account? signin here</Link>
                    </div>
                </form>
                </div>
                </div>
            </CenterCard363>
        );
    }
}

function validate(formProps) {
    const errors = {}
    if(formProps.password !== formProps.password2){
        errors.password = 'Password must match';
    }
    return errors;
}

function mapStateToProps({auth}) {
    return {
        errorMsg: auth.error
    }
}

SignupWithEmail.contextTypes = {
    router: PropTypes.object
  }

export default connect(mapStateToProps, {signupWithEmail})(reduxForm({
    form: 'SignupWithEmail',
    validate 
})(SignupWithEmail));