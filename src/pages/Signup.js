import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Select, MenuItem } from "@material-ui/core";
import { useAuth } from "../components/AuthContext";
import { Link } from "react-router-dom";
import TYPE from "../constants/UserType";
import { createUser } from "../api/UserAPI";
import _uniqueId from "lodash/uniqueId";
import { auth } from "../firebase";

import "./css/Home.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState(TYPE.CUSTOMER);
  const [userOpen, setUserOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await onPressCreateUser();
      window.location.href = "/";
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  async function onPressCreateUser() {
    let userObj = {
      UserID: auth.currentUser.uid,
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      UserTypeID: userType,
    };
    await createUser(userObj);
  }

  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={userOpen}
                onClose={() => setUserOpen(false)}
                onOpen={() => setUserOpen(true)}
                value={userType}
                onChange={(event) => {
                  setUserType(event.target.value);
                }}
              >
                <MenuItem value={TYPE.CUSTOMER}>Customer</MenuItem>
                <MenuItem value={TYPE.DEALERSHIP}>Dealership</MenuItem>
              </Select>
            </div>
            <Form.Group className="firstName" id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                ref={firstNameRef}
                required
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="lastName" id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                ref={lastNameRef}
                required
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="email" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="password" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group className="password-confirm" id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <div className="w-100 text-center mt-3">
              <Button disabled={loading} className="w-1000" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
