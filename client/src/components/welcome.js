import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RevieweerLogo from './logo';

class Welcome extends React.Component {
  render() {
    return (
      <div className="jumbotron" style={{"height": "100vh"}}>
        {/* <div style={{"marginTop":"20px","fontSize":"4em"}}>
          <i className="fab fa-amazon"></i>
        </div> */}
        <div style={{'margin': '30px auto'}}>
          <a href="/"><RevieweerLogo/></a>
        </div>
        <h1 className="display-4">Explore, Review, Earn!</h1>
        <div className="lead">Good products are waiting for you to explore. Order and review. <div> Revieweer&#8482; will pay you <i>up to 100% cashback + rewards</i></div></div>
        <div className="row">
        <div className="col-sm-12 col-md-3"></div>
        <div className="col-sm-12 col-md-6">
          {!this.props.isLoggedin
          ?<div style={{'marginTop': '80px'}}>
            <Link style={{'cursor': 'pointer'}} className="btn btn-dark btn-block btn-lg" to="signup">Join The Beta Program</Link>
            <Link style={{'cursor': 'pointer'}} className="btn btn-light btn-block btn-lg" to="signin">Sign in to dashboard</Link>
          </div>
          :<Link style={{'cursor': 'pointer'}} className="btn btn-light btn-block btn-lg" to="explore"><span>Explore</span></Link>}
        </div>
        </div>
      </div>)
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedin: auth.authenticated
});

export default connect(mapStateToProps, null)(Welcome);

