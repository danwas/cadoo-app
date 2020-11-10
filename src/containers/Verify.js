import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { useAuthContext } from "../libs/Auth";
import LoaderButton from "../components/LoaderButton";
import "../css/Verify.css";

function Verify() {
  const history = useHistory();
  const location = useLocation();
  const { setAuthTokens } = useAuthContext();
  const [authenticated, setAuthenticated] = useState(false);
  const [number, SetNumber] = useState(0);
  const name = location.state.name;

  const [fields, handleFieldChange] = useFormFields({
    number: "",
  });
  
  function validateForm() {
    return fields.number.length > 0;
  }

  function handleSignUp(event) {
    event.preventDefault();
    setAuthenticated(true);
    setAuthTokens(name);
    history.push("/");
  }



  return (
    <div className="Verify">
        <h3>We have sent a verification code to your phone</h3>
      <form onSubmit={handleSignUp}>
        
        <FormGroup controlId="number" bsSize="large">
          <ControlLabel></ControlLabel>
          <FormControl
            placeholder="verification code"
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
          Verify
        </LoaderButton>
      </form>
 
    </div>
  );
}

export default Verify;