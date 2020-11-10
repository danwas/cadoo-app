import React from 'react';
import { Nav, Navbar, NavItem, Form, FormControl, Button, NavbarBrand } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

function NavbarNotAuth() {
    return (
        <Navbar fluid collapseOnSelect className="navbar">
                <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/"><img src={require("../images/logo_tight.png")} className='home_logo'/></Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>

                

                <Navbar.Collapse>    
                

                <Nav pullRight>
                
                    
                <NavItem>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="search"/>
                    <Button variant="outline-success" className="searchbtn"> GO </Button>
                </Form>  
                </NavItem>

                    <LinkContainer to="/signup">
                    <NavItem className='signlog'><t>Signup</t></NavItem>
                    </LinkContainer>

                    <LinkContainer to="/login">
                    <NavItem class='signlog'><t>Login</t></NavItem>
                    </LinkContainer>

                </Nav>
                </Navbar.Collapse> 

                
            
        </Navbar>
    );
}

export default NavbarNotAuth;