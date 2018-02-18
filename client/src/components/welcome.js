import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import RevieweerLogo from './logo';

class Welcome extends React.Component {
  render() {
    return (
      <div className='jumbotron' style={{'height': '100vh'}}>
        <div className='background'></div>
        <div className='overlay'></div>
        <div className='content-container'>
          <Content isLoggedIn={this.props.isLoggedin}/>
        </div>
      </div>)
  }
}

const Content = (props) => {
  return (<div>
      <a href='/'>
        <img src='/assets/revieweer-logo.png' style={{'margin': '20px auto', 'width': '70px', 'height': '70px'}}/>
      </a>
        <h1 className='display-4'>Explore, Review, Earn!</h1>
      <div className='lead'>Good products are waiting for you to explore. Order and review. <div> Revieweer&#8482; will pay you up to 100% cashback + rewards</div></div>
      <div className='row'>
      <div className='col-sm-12 col-md-3'></div>
      <div className='col-sm-12 col-md-6'>
      <div style={{'marginTop': '50px'}}>
        {!props.isLoggedIn?
          <span>
            <Link style={{'cursor': 'pointer'}} className='btn btn-dark btn-block btn-lg' to='signup'>Join beta program</Link>
            <Link style={{'cursor': 'pointer'}} className='btn btn-light btn-block btn-lg' to='signin'>Sign in to dashboard</Link>
          </span>
          :<Link style={{'cursor': 'pointer'}} className='btn btn-light btn-block btn-lg' to='explore'><span>Explore</span></Link>}
      </div>
      </div>
      </div>
  </div>)
}

const mapStateToProps = ({ auth }) => ({
  isLoggedin: auth.authenticated
});

export default connect(mapStateToProps, null)(Welcome);

