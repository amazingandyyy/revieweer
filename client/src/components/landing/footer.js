import React from 'react';

const socials = [{
  icon: '',
  title: '',
  link: ''
}]

class Footer extends React.Component {
  render() {
    return (
      <div className='footer-component'>
        {this.renderSocials()}
      </div>)
  }
  renderSocials(){
    socials.map(s=>(
      <div className='social-item' key={s.title}>
        <div className='item-icon'>{s.icon}</div>
        <div className='item-title'>{s.description}</div>
        <div className='item-title'>{s.link}</div>
      </div>
    ));
  }
}

export default Footer;

