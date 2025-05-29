import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from 'axios';

const CreateApplication = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    gender: "Male",
    dob: "",
    ssn: "",
  });


  const ARAPI_URL= process.env.REACT_APP_AR_API_URL;

  const [submittedMessage, setSubmittedMessage] = useState(""); // New state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

       const preparedData = {
      ...formData,
      ssn: Number(formData.ssn),
    };
      const response = await axios.post(`${ARAPI_URL}/create-application`, preparedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSubmittedMessage(response.data.message); // Store message and hide form

      // Optional: reset form (not needed here since we hide it)
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        gender: 'Male',
        dob: '',
        ssn: '',
      });

    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        alert('Failed to create application: ' + (error.response.data.message || 'Unknown error'));
      } else {
        alert('Error submitting form');
      }
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Create Application</h3>

      {submittedMessage ? (
        <Alert variant="success">
          {submittedMessage}
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Male"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Female"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>SSN</Form.Label>
                <Form.Control
                  type="text"
                  name="ssn"
                  placeholder="Enter SSN"
                  value={formData.ssn}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default CreateApplication;
