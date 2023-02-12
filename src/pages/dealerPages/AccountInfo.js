import React from "react";
import { Form, Button, FormLabel } from "react-bootstrap";
import "../css/dealersAccountInfo.css";
import Controls from "../../components/controls/Controls";

export default function DealerAccountInfo() {
  const [name, setName] = React.useState("Open Road Hyundai Vancouver");
  const [location, setLocation] = React.useState("Vancouver 5848 Victoria Dr.");
  const [postalCode, setPostalCode] = React.useState("V5S 4J1");
  const [contactName, setContactName] = React.useState("John smith");
  const [email, setEmail] = React.useState("OpenRoadHyundai5485@gmail.com");
  const [phone, setPhone] = React.useState("6049876432");

  return (
    <div>
      <Controls.Button
        text="Inventory"
        color="#841584"
        variant="outlined"
        // className={classes.subButton}
        onClick={(event) => (window.location.href = "/inventory")}
      />
      <Controls.Button
        text="Subscription"
        color="#841584"
        variant="outlined"
        // className={classes.subButton}
        onClick={(event) => (window.location.href = "/subscription")}
      />
      <h2 className="mainHeader">Account Info</h2>
      <hr />
      <Form>
        <input
          type="text"
          class="form-control"
          placeholder={name}
          className="textInputs"
        />
        <br />
        <input
          type="text"
          class="form-control"
          placeholder={location}
          className="textInputs"
        />
        <br />
        <input
          type="text"
          class="form-control"
          placeholder={postalCode}
          className="textInputs"
        />
        <br />
        <input
          type="text"
          class="form-control"
          placeholder={contactName}
          className="textInputs"
        />
        <br />
        <input
          type="text"
          class="form-control"
          placeholder={email}
          className="textInputs"
        />
        <br />
        <input
          type="text"
          class="form-control"
          placeholder={phone}
          className="textInputs"
        />
        <br />
        <Button className="updateButton">Update</Button>
      </Form>
    </div>
  );
}
