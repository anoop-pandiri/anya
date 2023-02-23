import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const mystyle = {
  width:"100%",
  color:"white",
  overflow: "visible",
  background: "rgb(20, 20, 20)",
  position: "fixed",
  top: 0,
  padding: "0px 0px 0px 0px",
  opacity: "90%",
  zIndex: 2147483647,
  
};

const navLinks = {
  color: "white",
  textAline: "center",
  padding: "0px 10px",
  height: "20px",
};

const Header = () => {
  return (
    <div>
      <Navbar style={mystyle}>
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={"./images/Anya.png"} alt="Anya" width="50" height="55"/>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" style={navLinks}>Home</Nav.Link>
            <Nav.Link href="/animeDetails" style={navLinks}>Anime Details</Nav.Link>
            <Nav.Link href="#pricing" style={navLinks}>Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
