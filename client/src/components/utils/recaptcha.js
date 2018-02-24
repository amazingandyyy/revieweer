import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
let recaptchaInstance;
const resetRecaptcha = () => {
    recaptchaInstance.reset();
};
export class RecaptchaComponent extends Component {
  componentDidMount(){
    console.log('Recaptcha componentDidMount')
    resetRecaptcha();
  }
  componentWillUnmount(){
    console.log('Recaptcha componentWillUnmount')
    resetRecaptcha();
  }
  render() {
    return (
      <div>
        <Recaptcha
            ref={e => recaptchaInstance = e}
            sitekey="6LezYUcUAAAAAFI_dMXu8dmif5dyrf4KKpi0lfp9"
            render="explicit"
            verifyCallback={this.props.verify}
        />
      </div>
    );
  }
}
