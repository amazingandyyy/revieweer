import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signUserOut} from '../../actions';
import { Link } from 'react-router-dom';

class Signout extends Component {
    constructor(){
        super();
    }
    componentDidMount() {
        this.props.signUserOut()
    }
    render() {
        return (
            <div className="jumbotron" style={{"paddingBottom": "150px"}}>
                <img src='https://raw.githubusercontent.com/amazingandyyy/revieweer/master/assets/logo-sm.png?token=AHhU9OpdQNvrzw1l_lzWDzXLfKL1Biusks5af9sIwA%3D%3D' style={{'marginLeft': '-20px', 'transform': 'scale(0.6)'}} />
                <h1 className="display-4">Explore More, Earn More</h1>
                <p className="lead">There are many good products waiting for you to explore. Amazing Review is a webiste help you find them and help them grow. You pick whatever you like, you write amazing review, and we will pay you up to 100% cashback.</p>
                <p className="lead">
                    <Link style={{'cursor': 'pointer'}} className="btn btn-dark btn-lg early-access go-dashboard" to="account"><span>Login Again</span></Link>
                </p>
            </div>
        );
    }
}

export default connect(null, {signUserOut})(Signout)