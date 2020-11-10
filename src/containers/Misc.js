import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import { DropdownButton, MenuItem } from 'react-bootstrap';





function Misc() {

    function clicked() {
        alert('Coming soon');
      }

    function clicked2() {
    window.open('https://drive.google.com/drive/folders/14BMFVpAlzuxMOupb47O708EiSTo2vxRv?usp=sharing');
    }

    function clicked3() {
    window.open('https://youtu.be/CkzTCsL6cPw');
    }

    return (
        <ListGroup className="list-group">
            <ListGroupItem className="item" action onClick={clicked}>Profile</ListGroupItem>
            <ListGroupItem className="item" action onClick={clicked}>Subscriptions</ListGroupItem>
            
            <ListGroupItem className="item" action onClick={clicked}>Category</ListGroupItem>
            <ListGroup className="category-group">
                <ListGroupItem className="category-item" action onClick={clicked}>sports</ListGroupItem>
                <ListGroupItem className="category-item" action onClick={clicked}>food</ListGroupItem>
                <ListGroupItem className="category-item" action onClick={clicked}>science</ListGroupItem>
                <ListGroupItem className="category-item" action onClick={clicked}>social</ListGroupItem>
                <ListGroupItem className="category-item" action onClick={clicked}>nature</ListGroupItem>
                <ListGroupItem className="category-item" action onClick={clicked}>politics</ListGroupItem>
                <ListGroupItem className="category-item" action onClick={clicked}>movies</ListGroupItem>
                <ListGroupItem className="category-item" action onClick={clicked}>random</ListGroupItem>
            </ListGroup>


            <ListGroupItem className="item" action onClick={clicked}>Booked meetings</ListGroupItem>
            <ListGroupItem className="item" action onClick={clicked}>FAQ</ListGroupItem>
            <ListGroupItem className="item" action onClick={clicked}>Terms &#38; Conditions</ListGroupItem>
            <ListGroupItem className="item" action onClick={clicked}>Contact</ListGroupItem>
            <ListGroupItem className="item2" action onClick={clicked2}>Download report</ListGroupItem>
            <ListGroupItem className="item2" action onClick={clicked3}>Demo video</ListGroupItem>
        </ListGroup> 

    );
}

export default Misc;



