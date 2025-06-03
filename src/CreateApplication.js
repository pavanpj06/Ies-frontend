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

  const [submittedMessage, setSubmittedMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({}); // field-specific errors

  const ARAPI_URL = process.env.REACT_APP_AR_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear specific field error on change
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    }
  };

  const validateFields = () => {
    const errors = {};

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile number must be exactly 10 digits";
    }

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }

    if (!formData.dob) {
      errors.dob = "Date of birth is required";
    }

    if (!formData.ssn.trim() || isNaN(formData.ssn)) {
      errors.ssn = "SSN must be a number";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedMessage("");
    setIsError(false);

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsError(true);
      return;
    }

    try {
      const preparedData = {
        ...formData,
        ssn: Number(formData.ssn),
      };

      const response = await axios.post(`${ARAPI_URL}/create-application`, preparedData, {
        headers: { 'Content-Type': 'application/json' },
        validateStatus: () => true,
      });

      if (response.status === 201) {
        setSubmittedMessage(response.data.message || "Application created successfully.");
        setIsError(false);
        setFormData({
          fullName: '',
          email: '',
          mobileNumber: '',
          gender: 'Male',
          dob: '',
          ssn: '',
        });
        setFieldErrors({});
      } else {
        // Backend error handling
        const err = response.data;
        let errorMsg = "Something went wrong";
        if (typeof err === "string") {
          errorMsg = err;
        } else if (err.message) {
          errorMsg = err.message;
        } else if (err.exDesc) {
          errorMsg = err.exDesc;
        } else {
          errorMsg = JSON.stringify(err);
        }

        setSubmittedMessage(errorMsg);
        setIsError(true);
      }
    } catch (error) {
      console.error('Request Error:', error);
      setSubmittedMessage("Something went wrong while submitting the application.");
      setIsError(true);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Create Application</h3>

      {submittedMessage && (
        <Alert variant={isError ? "danger" : "success"}>
          {submittedMessage}
        </Alert>
      )}

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
                isInvalid={!!fieldErrors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.fullName}
              </Form.Control.Feedback>
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
                isInvalid={!!fieldErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.email}
              </Form.Control.Feedback>
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
                isInvalid={!!fieldErrors.mobileNumber}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.mobileNumber}
              </Form.Control.Feedback>
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
                isInvalid={!!fieldErrors.dob}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.dob}
              </Form.Control.Feedback>
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
                isInvalid={!!fieldErrors.ssn}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.ssn}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateApplication;
