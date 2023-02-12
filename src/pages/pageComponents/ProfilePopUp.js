import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button } from "react-bootstrap";

const ProfilePopUp = ({
  modalState,
  setRegistrationState,
  registrationState,
  setModalState,
}) => {
  const userRegistrationHandler = (e) => {
    setRegistrationState(e.target.value);
  };

  return (
    <Modal show={modalState} aria-label="Close">
      <Modal.Header>
        <Modal.Title>Change</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group controlId="formEmail">
            <Form.Label> New Password: </Form.Label>
            <Form.Control type="email" placeholder="Enter password" />
            <Form.Text />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setModalState(false);
            
          }}
        >
          Close
        </Button>
        <Button className="btn-success">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfilePopUp;
