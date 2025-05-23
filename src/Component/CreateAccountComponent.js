import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAccountComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const show = location.pathname.endsWith("/user-account-creation");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    ssNumber: "",
    roleId: ""
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const validateForm = () => {
    const newErrors = [];
    if (!formData.fullName.trim()) newErrors.push("Full Name is required");
    if (!formData.email.trim()) newErrors.push("Email is required");
    if (!formData.mobileNumber.match(/^\d{10}$/)) newErrors.push("Mobile number must be 10 digits");
    if (!formData.gender) newErrors.push("Gender is required");
    if (!formData.dateOfBirth) newErrors.push("Date of Birth is required");
    if (!formData.ssNumber.trim()) newErrors.push("SSN is required");
    if (!formData.roleId) newErrors.push("Role ID is required");
    return newErrors;
  };

  const handleSubmit = async () => {
    setErrors([]);
    setSuccessMessage("");

    const formattedDate = new Date(formData.dateOfBirth);
    const formattedDateString = `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;

    const payload = { ...formData, dateOfBirth: formattedDateString };

    const clientSideErrors = validateForm();
    if (clientSideErrors.length > 0) {
      setErrors(clientSideErrors);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE_URL}/account-creation`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(response.data.message || "Account created successfully!");
        setTimeout(() => handleClose(), 2000);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && typeof data === "object") {
          setErrors(Object.values(data));
        } else if (status === 409) {
          setErrors([data.message]);
        } else {
          setErrors(["Something went wrong. Please try again."]);
        }
      } else {
        console.error("Axios error:", error);
        setErrors(["Failed to create account. Please try again later."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {errors.length > 0 && (
            <Alert variant="danger">
              <ul className="mb-0">
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </Alert>
          )}

          {successMessage && (
            <Alert variant="success">{successMessage}</Alert>
          )}

          <Row>
            <Col md={6}>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name<span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control name="fullName" type="text" placeholder="Full Name" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email ID<span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control name="email" type="email" placeholder="Email" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group controlId="mobileNumber">
                <Form.Label>Mobile Number<span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control name="mobileNumber" type="text" placeholder="Phone No" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="gender">
                <Form.Label>Gender<span style={{ color: "red" }}>*</span></Form.Label>
                <div>
                  <Form.Check inline label="Male" type="radio" name="gender" value="Male" onChange={handleChange} />
                  <Form.Check inline label="Female" type="radio" name="gender" value="Female" onChange={handleChange} />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group controlId="dob">
                <Form.Label>DOB<span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control name="dateOfBirth" type="date" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="ssn">
                <Form.Label>SSN<span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control name="ssNumber" type="text" placeholder="SSN Number" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6} className="mt-3">
              <Form.Group controlId="role-id">
                <Form.Label>Role<span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control name="roleId" type="number" placeholder="Role Id" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-4 text-center">
            <Button variant="success" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAccountComponent;
