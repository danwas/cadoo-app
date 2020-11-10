import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { ButtonGroup, ToggleButtonGroup, ToggleButton, Button, Navbar, Nav, NavItem, FormControl } from 'react-bootstrap';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { AuthContext, useAuthContext } from "../libs/Auth";
import "../css/Room.css"; 


const img_mute = require('../images/mute.png');
const img_video = require('../images/video.png');


const RemoteStyledVideo = styled.video`
    width: 75%;
    height: 75%;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    border-radius: 10px;
    border: 2px solid white;
    border-color: rgb(66, 66, 66);
`;

const LocalStyledVideo = styled.video`
    width: 100%;
    height: 100%;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    border-radius: 10px;
    border: 2px solid white;
    border-color: rgb(66, 66, 66);
`;


const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <RemoteStyledVideo playsInline autoPlay ref={ref} />
    );
}

const videoConstraints = {
    height: window.innerHeight,
    width: window.innerWidth,
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const [toggleAudio, setToggleAudio] = useState(1);
    const [toggleVideo, setToggleVideo] = useState(1);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const history = useHistory();
    
    const context = useAuthContext(AuthContext);
    const username = context.authTokens;
    const roomID = props.match.params.roomID;


    useEffect(() => {
        socketRef.current = io.connect("/");
        
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join-room", { 
                roomID: roomID, 
                name: username
            });
            
            socketRef.current.on("all-users", users => {
                const peers = [];
                users.forEach(participant => {
                    const peer = createPeer(participant.name, participant.id, socketRef.current.id, stream);

                    peersRef.current.push({
                        peerID: participant.id,
                        peerName: participant.name,
                        peer,
                    })
                    peers.push({
                        peerID: participant.id,
                        peerName: participant.name,
                        peer
                    });
                })
                setPeers(peers);
            });

            socketRef.current.on("user-joined", payload => {
                const peer = addPeer(payload.name, payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peerName: payload.name,
                    peer,
                })

                const peerObj = {
                    peer,
                    peerID: payload.callerID,
                    peerName: payload.name
                }
                setPeers(users => [...users, peerObj]);
            });

            socketRef.current.on("receiving-returned-signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on("user-left", id => {
                const peerObj = peersRef.current.find(p => p.peerID === id);
                if (peerObj) {
                    peerObj.peer.destroy();
                }
                const peers = peersRef.current.filter(p => p.peerID !== id);
                peersRef.current = peers;
                setPeers(peers);

            });
           
        })
    }, []);

    function createPeer(name, userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending-signal", { name, userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(name, incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })
       
        peer.on("signal", signal => {
            socketRef.current.emit("returning-signal", { name, signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function LeaveRoom() {
        socketRef.current.emit("disconnect-button");
        stopBothVideoAndAudio(userVideo.current.srcObject);
        socketRef.current.disconnect();
        history.push({
            pathname: '/'
        });  
    }

    function stopBothVideoAndAudio(stream) {
        stream.getTracks().forEach(function(track) {
            if (track.readyState == 'live') {
                track.stop();
            }
        });
    }

    const handleChange = (val) => {
        if (val == 0) {
            if (toggleAudio == 1) {
                alert("muted");
                setToggleAudio(0);
            } else {
                alert("not muted");
                setToggleAudio(1);
            }

        } else if (val == 1) {
            if (toggleVideo == 1) {
                alert("video off");
                setToggleVideo(0);
            } else {
                alert("video on");
                setToggleVideo(1);
            }
        }
    }



    return (
            <div className="Room">
                <div className="column-left">

                    <div className="buttons-container">
                        
                            <Button 
                                className="buttons-leave" 
                                onClick={ LeaveRoom }
                                
                                >Leave</Button>

                            <ToggleButtonGroup type="checkbox" onChange={ handleChange }>
                                <ToggleButton 
                                    className="buttons-mute-off" 
                                    value={0}>
                                    
                                    <img
                                        src= {img_mute}
                                        className= 'mute-img'
                                    />
                                </ToggleButton>

                                <ToggleButton 
                                    className="buttons-mute-off" 
                                    value={1}>
                                        
                                    <img
                                        src= {img_video}
                                        className= 'mute-img'
                                    />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        
                    </div>

                    <div className="local-video-container">    
                        <LocalStyledVideo muted ref={userVideo} autoPlay playsInline />
                    </div>

                    <div class="chat">
                        <p1>Här kommer en chat!</p1>
                    </div>
                </div>

                <div className="column-right">
                    <Navbar className="navbar-room">
                        <Navbar.Brand className="nav-item">Hi {username}! You are Cadooing about - Chess</Navbar.Brand>
                    </Navbar>

                    <div className="lower-video-bar">
                        <div className="remote-video-container">
                            {peers.map((peer) => {
                                return (
                                    <div className="remote-video-item">
                                        <Video key={peer.peerID} peer={peer.peer}/>
                                        <h3>{peer.peerName}</h3>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>         
    );
};

export default Room;


// filter(peer => peer.peerID !== socketRef.current.id)

// {peers.map((peer) => {

                    
//     return (
//         <Video key={peer.peerID} peer={peer.peer} />    
//     );
// })}