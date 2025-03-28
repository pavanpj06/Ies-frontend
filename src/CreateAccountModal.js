import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const CreateAccountModal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const show = location.pathname === "/user-account-creation"; // Show modal when on this route

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page when modal is closed
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Full Name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="mobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="text" placeholder="Phone No" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <Form.Check inline label="Male" type="radio" name="gender" />
                    <Form.Check inline label="Female" type="radio" name="gender" />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="dob">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ssn">
                  <Form.Label>SSN</Form.Label>
                  <Form.Control type="text" placeholder="SSN Number" />
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4 text-center">
              <Button variant="success" onClick={handleClose}>
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateAccountModal;
