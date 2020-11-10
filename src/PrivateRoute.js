import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./libs/Auth";

function PrivateRoute({ component: Component, ...rest }) {
    const { authTokens } = useAuthContext();
  
  return(
    <Route 
        {...rest} 
        render={props => 
            authTokens ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )}
    />
  );
}

export default PrivateRoute;