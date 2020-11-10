import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';

import Home from "./containers/Home";
import CreateRoom from "./containers/CreateRoom";
import Room from "./containers/Room";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import Verify from "./containers/Verify";
import RoomSignup from "./containers/RoomSignup";


class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>

                    <Route path="/login" component={ Login }/>

                    <Route path="/signup" component={ Signup }/>
         
                    <Route path="/" exact component={ Home } />

                    <Route path="/verification" exact component={ Verify } />

                    <PrivateRoute path="/create-room" component={ CreateRoom } />

                    <PrivateRoute path="/room/:roomID" component={ Room } />

                    <PrivateRoute path="/room-signup/:roomID" component={ RoomSignup } />

                    <PrivateRoute component={ NotFound }/>

                </Switch>
            </div>
        )
    }
}

export default Routes;
