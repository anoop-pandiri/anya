import React from 'react';

const mystyle = {
  width:"100%",
  color:"white",
  overflow: "visible",
  background: "rgb(20, 20, 20)",
  position: "fixed",
  top: 0,
  opacity: "90%",
  zIndex: 2147483647,
  
};

const Header = () => {
  return (
    <div>
      <nav className="navbar" style={mystyle}>
      <div className="navitem"><a href="#home"><img src={"./images/Anya.png"} alt="Anya" width="50" height="55"/></a></div>
      </nav>
    </div>
  );
};

export default Header;
