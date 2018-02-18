import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUserOut } from '../../actions';

class Signout extends React.Component {
    componentDidMount() {
        this.props.signUserOut()
    }
  render() {
    return (
      <div className='jumbotron' style={{'height': '100vh'}}>
        <div className='background' style={{'opacity': '0.75'}}></div>
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
        <h1 className='display-4'>See you soon!</h1>
      <div className='lead'>Good products are waiting for you to explore.</div>
      <div className='row'>
      <div className='col-sm-12 col-md-3'></div>
      <div className='col-sm-12 col-md-6'>
      <div style={{'marginTop': '50px'}}>
        {!props.isLoggedIn?
          <span>
            <Link style={{'cursor': 'pointer'}} className='btn btn-light btn-block btn-lg' to='signin'>Sign in again</Link>
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

export default connect(mapStateToProps, {signUserOut})(Signout);

