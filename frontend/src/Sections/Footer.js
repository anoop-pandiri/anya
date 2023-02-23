import React from 'react';
//import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const mystyle = {
  bottom: 0,
  width:"100%",
  background:"black",
  color:"grey",
  padding:"2%",
  textAlign : "center",
  
};

const Footer = () => {
  return (
    <footer style={mystyle}>
        <p>© 2023 All rights reserved by ANYA</p>
    </footer>
  );
};

export default Footer;
