import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "./libs/Auth";

// Navbar
import NavbarAuth from './containers/NavbarAuth';
import NavbarNotAuth from './containers/NavbarNotAuth';

// Routes
import Routes from "./Routes";

// Styling
import "./App.css"; 


function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const history = useHistory();

  useEffect(() => {
  }, []);

  async function handleLogout() {
    setAuthTokens();
    localStorage.clear();
    history.push("/login");
  }

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <div className="App">
      { authTokens ? <NavbarAuth handleLogout={handleLogout}/> : <NavbarNotAuth/> }

      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Routes />
      </AuthContext.Provider>
    </div>
  );
}

export default App;

