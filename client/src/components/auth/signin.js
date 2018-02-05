import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {signUserIn} from '../../actions';
import CenterCard363 from '../centerCard363';

class Signin extends Component {
    handleFormSubmit(d) {
        this.props.signUserIn(d)
    }
    render() {
        const {handleSubmit} = this.props;
        return (
                <CenterCard363>
                    <div className='card'>
                    <h4 className="card-header">
                        Signin Your Revieweer
                    </h4>
                    <img src='https://raw.githubusercontent.com/amazingandyyy/revieweer/master/assets/logo-sm.png?token=AHhU9OpdQNvrzw1l_lzWDzXLfKL1Biusks5af9sIwA%3D%3D' style={{'margin': '10px auto', 'transform': 'scale(0.6)'}}/>
                        <div className="card-body">
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <div className="form-group">
                                <label>Email:</label>
                                <Field
                                    type= 'email'
                                    name="email"
                                    component="input"
                                    className="form-control form-control-lg"
                                    placeholder="email@email.com"
                                    required
                                    />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <Field
                                    type= 'password'
                                    name="password"
                                    component="input"
                                    className="form-control form-control-lg"
                                    placeholder="your password"
                                    required
                                    />
                            </div>
                            <div style={{'paddingTop': '30px'}}>
                                <button type="submit" className="btn btn-lg btn-light btn-block">Sign in</button>
                            </div>
                            <div style={{'paddingTop': '20px'}}>
                                <Link to='/signup' className="btn btn-link btn-block">Dont have an account yet? signup here</Link>
                            </div>
                        </form>
                        </div>
                    </div>
                </CenterCard363>
        );
    }
}

function mapStateToProps({auth}) {
    return {
        errorMsg: auth.error
    }
}

export default connect(mapStateToProps, {signUserIn})(reduxForm({
    form: 'signin'
})(Signin));