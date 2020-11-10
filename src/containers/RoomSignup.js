import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Misc from './Misc';
import LoaderButton from "../components/LoaderButton";

import "../css/Home.css"; 

const images = [
    require('../images/space_cadoo.png'),
    require('../images/election_cadoo.png'),
    require('../images/warhammer_cadoo.png'),
    require('../images/trav.png'),
    require('../images/pizza_cadoo.png'),
    require('../images/plants_cadoo.png'),
    require('../images/olga.png'),
    require('../images/sunday-football.png'),
    require('../images/knitting.png'),
    require('../images/haunting.png'),
]

function RoomSignup(props) {
    const socketRef = useRef();
    const location = useLocation();
    const history = useHistory();
    const roomID = props.match.params.roomID;

    const [this_room, setRoom] = useState([]);

    function handleSignUp(event) {
        event.preventDefault();
        history.push("/");
      }

    useEffect(() => {
        fetchRooms();
    },[]);

    const fetchRooms = async () => {
        
        const res = await fetch(
            "/api/plannedRooms"
            );
        const data = await res.json();
        for (let index = 0; index < data.rooms.length; index++) {
            const room = data.rooms[index];
            if (room.roomID == roomID) {
                setRoom(room);
            }            
        }
        
    }

    return (
        <div className="Home">
            <div class='column-left'>
                <Misc />
            </div>           
            <div class='column-right'>
            <div className="topDiv">
                <h1>{this_room.topic} on {this_room.date} {this_room.time}</h1>
                <div class='center'>
                    <img class='centerimg' src={images[parseInt(roomID)%(images.length)]} />
                </div>
                <div class='roomSignupButton'>
                <form onSubmit={handleSignUp}>
                <LoaderButton
                block
                type="submit"
                bsSize="large"
                >
                    Sign up for discussion!
                </LoaderButton>
                </form>
                </div>
            </div>
            <br></br>
            </div>
        </div>
    )
}

export default RoomSignup;