import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
  render() {
    return (
      <div className="jumbotron" style={{"height": "100vh"}}>
        <div style={{"marginTop":"20px","fontSize":"4em"}}>
          <i className="fab fa-amazon"></i>
        </div>
        <h1 className="display-4">Explore, Review, Earn!</h1>
        <p className="lead">Here are many good products waiting for you to explore. Order and review and we will pay you up to 100% cashback.</p>
        <p className="lead">
          {!this.props.isLoggedin
          ?<Link style={{'cursor': 'pointer'}} className="btn btn-dark btn-lg early-access go-dashboard" to="signup"><span>Early Access</span></Link>
          :<Link style={{'cursor': 'pointer'}} className="btn btn-dark btn-lg early-access go-dashboard" to="explore"><span>Explore</span></Link>}
        </p>
      </div>)
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedin: auth.authenticated
});

export default connect(mapStateToProps, null)(Welcome);

