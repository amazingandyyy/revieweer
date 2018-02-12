import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signUserOut } from '../../actions';
import RevieweerLogo from '../logo';
class Signout extends React.Component {
    componentDidMount() {
        this.props.signUserOut()
    }
    render() {
        return (
            <div className="jumbotron" style={{"height": "100vh"}}>
                <RevieweerLogo />
                <h1 className="display-4">Explore More, Earn More</h1>
                <p className="lead">Here are many good products waiting for you to explore. Order and review and we will pay you up to 100% cashback.</p>
                <p className="lead">
                    <Link style={{'cursor': 'pointer'}} className="btn btn-dark btn-lg early-access go-dashboard" to="account"><span>Login Again</span></Link>
                </p>
            </div>
        );
    }
}

export default connect(null, {signUserOut})(Signout)