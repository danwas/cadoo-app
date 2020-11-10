import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import "../css/Home.css"; 

const images = [require('../images/anything.png'), require('../images/chess.png'), require('../images/trav.png'), require('../images/spanska.png')];

function CurrentRooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchRooms();
    },[]);
    
    const fetchRooms = async () => {
        
        const res = await fetch(
            "/api/currentRooms"
            );
        const data = await res.json();
        setRooms(data.rooms);
    }

    return (
        <div>
            <Carousel>
                {rooms.map(room => (
                        <Carousel.Item>
                            <div class='center'>
                            <Link to={`/room/${room.roomID}`}>  
                            <img
                            src= {images[parseInt(room.roomID)%4]}
                            class= 'centerimg'
                            />
                            <img
                            src= {require('../images/preview.png')}
                            class= 'innerpreview'
                            />
                            <img
                            src= {require('../images/live_icon.png')}
                            class= 'innerimg'
                            />
                            
                            <Carousel.Caption>
                                <div class='centertext'>
                                    <h1>{ room.topic }</h1>
                                    <h4>{ room.description }</h4>
                                </div>
                            </Carousel.Caption>
                            </Link>
                            </div>
                            
                        </Carousel.Item>
                ))} 
            </Carousel>
                    
        </div>
    )
}



// function CurrentRooms  Component {
//     constructor(props) {
//         super(props)
//         this.state = { 
//             rooms: []
//         }
//     }

//     componentDidMount() {
//         fetch("/api/currentRooms")
//         .then(res => res.json())
//         .then(data => {
//             this.setState({ rooms: data.rooms })
//     })
//     .catch(err => console.log(err));
//     }
    


//     render() {
//         return (
//             <div>
//                 <h1>{this.state.rooms}</h1>
//             </div>
//         )
//     }
// }

export default CurrentRooms;
