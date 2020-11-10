import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { v4 as uuid } from "uuid";

import "../css/CreateRoom.css";


export default function CreateRoom() {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    description: "",
    date: "2020-11-10",
    time: "",
    numPeople: 4,
  });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.name.length > 0 &&
      fields.description.length > 0 &&
      fields.date > 0&&
      fields.time > 0&&
      fields.numPeople < 9
    );
  }

  function create() {
    const id = uuid();
    history.push({
        pathname: `/room/${id}`,
        state: {
            roomID: id, 
            description: fields.description,
            name: fields.name,
            numPeople: fields.numPeople
        }
    });
  } 


  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    create()
    setIsLoading(false);
  }


  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel></ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
            placeholder="topic"
          />
        </FormGroup>
        <FormGroup controlId="description" bsSize="large">
          <ControlLabel></ControlLabel>
          <FormControl
            type="text"
            placeholder="description"
            value={fields.description}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="date" bsSize="large">
          <ControlLabel></ControlLabel>
          <FormControl
            type="date"
            onChange={handleFieldChange}
            value={fields.date}
          />
        </FormGroup>
        <FormGroup controlId="time" bsSize="large">
          <ControlLabel></ControlLabel>
          <FormControl
            type="time"
            onChange={handleFieldChange}
            value={fields.time}
          />
        </FormGroup>
        <br></br>
        <h3>No. of participants:</h3>
        <FormGroup controlId="numPeople" bsSize="large">
          <ControlLabel></ControlLabel>
          <FormControl
            type="number"
            onChange={handleFieldChange}
            value={fields.numPeople}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create a new room
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="CreateRoom">
      { renderForm() }
    </div>
  );
}
