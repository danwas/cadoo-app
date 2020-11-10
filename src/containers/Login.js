import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { useAuthContext } from "../libs/Auth";
import LoaderButton from "../components/LoaderButton";
import "../css/Login.css";

export default function Login() {
  const history = useHistory();
  const { setAuthTokens } = useAuthContext();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });
  
  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  function handleLogin(event) {
    event.preventDefault();

    if (userAuth(fields.email, fields.password)) {
      setAuthenticated(true);
      setAuthTokens(fields.email);
      history.push("/");
      
    } else {
      alert("username or password is incorrect!");
    }
  }

  const userAuth = async (email, password) => {
    const res = await fetch("/api/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    });
    const data = await res.json();
    return data.success;
}

  return (
    <div className="Login">
      <form onSubmit={handleLogin}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel></ControlLabel>
          <FormControl
            autoFocus
            type="text"
            placeholder="name"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel></ControlLabel>
          <FormControl
            placeholder="password"
            value={fields.password}
            onChange={handleFieldChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}