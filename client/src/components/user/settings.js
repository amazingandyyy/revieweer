import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import Dropzone from 'react-dropzone'

import {serverConnect, getUserProfile, updateUserProfile, updateProfileAvatar} from '../../actions';
import { CenterCard121 } from '../utils';

class Settings extends React.Component {
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
  onDrop(acceptedFiles, rejectedFiles) {
    acceptedFiles.forEach(file => {
      this.props.updateProfileAvatar(file);
      // const reader = new FileReader();
      //   reader.onload = () => {
      //       const fileAsBinaryString = reader.result;
      //       this.props.updateProfileAvatar(fileAsBinaryString);
      //   };
      //   reader.onabort = () => console.log('file reading was aborted');
      //   reader.onerror = () => console.log('file reading has failed');

      //   reader.readAsBinaryString(file);
    });
  }
  render() {
    let {profile} = this.props;
    console.log(profile);
    return (
      <CenterCard121 className='settings-component'>
        <div className='card'>
        <h4 className="card-header">
          Settings
        </h4>
        {this.renderDropzone(profile)}
        <div className='card-body'>
          {profile && this.renderProfileForm()}
        </div>
        </div>
      </CenterCard121>
    );
  }
  renderDropzone(profile){
    if(profile.avatar){
      return (<div className='card-body profile-avatar-dropzone with-avatar-image'>
      <Dropzone
        accept="image/jpeg, image/png"
        onDrop={this.onDrop.bind(this)}
      >
        <img className='avatar-image' src={profile.avatar} />
        <div className='hint'>
          <i className="fas fa-camera"></i>
          Update Photo
        </div>
        <div className='overflow'></div>
      </Dropzone>
    </div>)
    }else{
      return (
        <div className='card-body profile-avatar-dropzone without-avatar-image'>
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={this.onDrop.bind(this)}
          >
          <p>No photo!<br/>Drop or select your profile photo</p>
          </Dropzone>
        </div>)
    }
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
      <div className="form-group">
        <label>venmo ID:</label>
        <Field
          disabled={!editting}
          type= 'string'
          name="venmoId"
          component="input"
          className="form-control form-control-lg"
          placeholder="your venmo ID"
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
      profile: profile,
      initialValues: {
        email: profile.email,
        firstName: profile.name.first,
        lastName: profile.name.last,
        venmoId: profile.venmoId
      },
      updateProfileFailMsg: profile.updateProfileFailMsg,
      isLoggedin: auth.authentication
    }:{
      profile: profile,
      isLoggedin: auth.authentication
  }
}


export default connect(mapStateToProps, {serverConnect, getUserProfile, updateUserProfile,updateProfileAvatar})(reduxForm({
  form: 'profileUpdate',
})(Settings));