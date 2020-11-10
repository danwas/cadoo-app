import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { useAuthContext } from "../libs/Auth";
import LoaderButton from "../components/LoaderButton";
import "../css/Login.css";

function Signup() {
  const history = useHistory();
  const { setAuthTokens } = useAuthContext();
  const [authenticated, setAuthenticated] = useState(false);
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, SetNumber] = useState(0);

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    name: "",
    number: "",
  });
  
  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0 && fields.name.length > 0 && fields.number.length > 0;
  }

  function handleSignUp(event) {
    event.preventDefault();
    history.push({
      pathname: '/verification',
      state: { name: fields.name }
    });
  }



  return (
    <div className="Login">
      <form onSubmit={handleSignUp}>

      <FormGroup controlId="name" bsSize="large">
          <ControlLabel></ControlLabel>
          <FormControl
            placeholder="name"
            value={fields.name}
            onChange={handleFieldChange}
            type="text"
          />
        </FormGroup>

        <FormGroup controlId="email" bsSize="large">
          <ControlLabel></ControlLabel>
          <FormControl
            autoFocus
            type="Email"
            placeholder="email@example.com"
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

        <FormGroup controlId="number" bsSize="large">
          <ControlLabel></ControlLabel>
          <FormControl
            placeholder="phone number"
            value={fields.number}
            onChange={handleFieldChange}
            type="number"
          />
        </FormGroup>

        <LoaderButton
          block
          type="submit"
          bsSize="large"
          disabled={!validateForm()}
        >
          Sign up!
        </LoaderButton>
      </form>
 
    </div>
  );
}

export default Signup;