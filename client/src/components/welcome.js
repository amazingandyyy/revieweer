import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
  render() {
    return (<div>
      <div className="jumbotron" style={{"paddingBottom": "150px"}}>
        <div style={{"marginTop":"20px","fontSize":"4em"}}>
          <i className="fab fa-amazon"></i>
        </div>
        <h1 className="display-4">Review New Products, Make Money Everyday!</h1>
        <p className="lead">There are many good products waiting for you to explore. Amazing Review is a webiste help you find them and help them grow. You pick whatever you like, you write amazing review, and we will pay you up to 100% cashback.</p>
        <p className="lead">
          {!this.props.isLoggedin
          ?<Link style={{'cursor': 'pointer'}} className="btn btn-dark btn-lg early-access go-dashboard" to="account"><span>Early Access</span></Link>
          :<Link style={{'cursor': 'pointer'}} className="btn btn-dark btn-lg early-access go-dashboard" to="explore"><span>Explore</span></Link>}
        </p>
      </div>
    </div>)
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedin: auth.authenticated
});

export default connect(mapStateToProps, null)(Welcome);

