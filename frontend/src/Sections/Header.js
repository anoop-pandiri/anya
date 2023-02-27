import {React,useState} from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Form } from 'react-bootstrap';

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
  color: "rgb(255, 79, 108)",
  textAlign: "center",
  fontweight: "bold !important",
  padding: "0px 10px",
  fontSize: "20px",
};


const Header = () => {
  
  const [search, setSearch] = useState([""]);

  const setSearchText = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div>
      <Navbar style={mystyle}>
          <Navbar.Brand href="/">
            <img src={"../images/Anya.png"} alt="Anya" width="50" height="55"/>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" style={navLinks}>Home</Nav.Link>
            <Nav.Link href="/animeDetails" style={navLinks}>Anime Details</Nav.Link>
            <Form >
              <Form.Control style={{width: '250px'}}
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearchText(e)}
              />
            </Form>
           
          </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
