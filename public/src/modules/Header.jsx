import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./styles/Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar variant="dark">
        <Navbar.Brand>Weather Station for Tivix</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
