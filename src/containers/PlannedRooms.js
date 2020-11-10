import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/Home.css"; 

//const images = [require('../images/spanska.png'), require('../images/chess.png'), require('../images/trav.png')];
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

function PlannedRooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchRooms();
    },[]);
    
    const fetchRooms = async () => {
        
        const res = await fetch(
            "/api/plannedRooms"
            );
        const data = await res.json();
        setRooms(data.rooms);
    }

    return (
        <div class='lander'>
            <h2>Upcoming</h2>
            {rooms.map(room => (   
                <div class='column'>
                
                <Link to={`/room-signup/${room.roomID}`}>
                
                        <img
                        src={images[parseInt(room.roomID)%(images.length)]}
                        />  
                </Link>
                <div class='time'><p1>{room.date} {room.time}</p1></div>
                
                <div class="description">
                    <h3>{ room.topic }</h3>
                    <h5>{ room.description }</h5>
                </div>
                </div>
                ))} 
            {rooms.map(room => (   
                <div class='column'>
                
                <Link to={`/room/${room.roomID}`}>
                
                        <img
                        src={images[parseInt(room.roomID)%(images.length)]}
                        />  
                </Link>
                <div class='time'><p1>{room.date} {room.time}</p1></div>
                
                <div class="description">
                    <h3>{ room.topic }</h3>
                    <h5>{ room.description }</h5>
                </div>
                </div>
                ))} 
        </div>
    )
}

export default PlannedRooms;
