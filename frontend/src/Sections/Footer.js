import React from 'react';
//import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const mystyle = {
  bottom: 0,
  width:"100%",
  background:"black",
  color:"rgb(249, 201, 58)",
  padding:"20px",
  textAlign : "center",
};

const Footer = () => {
  return (
    <footer style={mystyle}>
      <span>This site does not store any content on it's server. All contents are provided by non-affiliated third parties</span>
      <p>© 2023 All rights reserved by ANYA</p>
    </footer>
  );
};

export default Footer;
