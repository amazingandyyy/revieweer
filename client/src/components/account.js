import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {serverConnect, getUserProfile, updateUserProfile} from '../actions';
import { CenterCard121 } from './utils';

class Account extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editting: false
    }
  }
  componentWillMount(){
    this.props.serverConnect();
    this.props.getUserProfile();
  }
  render() {
    let {status, profile} = this.props;
    return (
      <CenterCard121>
        <div className='card'>
        <h4 className="card-header">
          Account
        </h4>
        <div className='card-body'>
        <p className="text-muted">Server status: {status} ☀</p>
          {profile && this.renderProfileForm()}
        </div>
        </div>
      </CenterCard121>
    );
  }
  handleFormSubmit(d){
    this.props.updateUserProfile(d)
  }
  switchEditting() {
    this.setState({editting: !this.state.editting})
  }
  cancelForm(){
    this.switchEditting();
    this.props.reset();
  }
  renderButtons() {
    const {submitting, dirty} = this.props;
    if(this.state.editting){
      return (<div className="form-group">
        <button disabled={!dirty} type="submit" className="btn-lg btn btn-success btn-block">Save Change</button>
        <button disabled={submitting} className="btn-lg btn btn-secondary btn-block" onClick={this.cancelForm.bind(this)}>Cancel</button>
      </div>)
    }else{
      return (<button className="btn btn-light btn-lg btn-block" onClick={this.switchEditting.bind(this)}>Update Information</button>)
    }
  }
  renderProfileForm(){
    const {editting} = this.state;
    const {handleSubmit, dirty, updateProfileFailMsg} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group">
          <label>First Name:</label>
          <Field
            disabled={!editting}
            type= 'text'
            name="firstName"
            component="input"
            className="form-control form-control-lg"
            placeholder="First Name"
            required
            />
      </div>

      <div className="form-group">
        <label>Last Name:</label>
        <Field
          disabled={!editting}
          type= 'text'
          name="lastName"
          component="input"
          className="form-control form-control-lg"
          placeholder="Last Name"
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <Field
            disabled
            readOnly='true'
            type= 'email'
            name="email"
            component="input"
            className="form-control form-control-lg"
            placeholder="your email adddress"
            required
            />
      </div>
      {dirty && <div className="form-group">
        <label>Password:</label>
        <Field
          type= 'password'
          name="password"
          component="input"
          className={(updateProfileFailMsg)?"form-control form-control-lg is-invalid":"form-control form-control-lg"}
          placeholder="your password"
          required
        />
        {(updateProfileFailMsg) && <div className="invalid-feedback">
          {updateProfileFailMsg}
        </div>}
      </div>}
      <div style={{'paddingTop': '30px'}}>
        {this.renderButtons()}
      </div>
    </form>);
  }
}

function mapStateToProps({server, profile, auth}) {
  return profile.name?{
      status: server.connection,
      profile: profile,
      initialValues: {
        email: profile.email,
        firstName: profile.name.first,
        lastName: profile.name.last
      },
      updateProfileFailMsg: profile.updateProfileFailMsg,
      isLoggedin: auth.authentication
    }:{
      status: server.connection,
      profile: profile,
      isLoggedin: auth.authentication
  }
}


export default connect(mapStateToProps, {serverConnect, getUserProfile, updateUserProfile})(reduxForm({
  form: 'profileUpdate',
})(Account));