import React from 'react';

const footerStyle = {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: window.innerWidth,
    border: '3px solid #73AD21',
    textAlign: 'center'
};

const Footer = (props) => (
  <div style={footerStyle}>Cheyenne Zhang '22</div>
);

export default Footer;
