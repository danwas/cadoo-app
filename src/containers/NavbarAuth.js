import React, { useState, useEffect } from 'react';
import { Nav, Navbar, NavItem, Form, FormControl, Button, NavbarBrand } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";


function NavbarAuth(props) {
    return (
        <Navbar fluid collapseOnSelect className='navbar'>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"><Link to="/"><img src={require("../images/logo_tight.png")} className='home_logo'/></Link></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        
        <Nav>
          <LinkContainer to="/create-room">
                <NavItem className="nav-item-auth">Create Room</NavItem>
          </LinkContainer>
        </Nav>


        <Navbar.Collapse>
          <Nav pullRight> 
              <NavItem>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="search"/>
                    <Button variant="outline-success" className="searchbtn">GO</Button>
                </Form>  
                </NavItem>
              <NavItem onClick={props.handleLogout}>Logout</NavItem> : 
          </Nav>
      </Navbar.Collapse>
      </Navbar>

    );
}


export default NavbarAuth;