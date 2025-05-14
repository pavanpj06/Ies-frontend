import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch("http://localhost:8080/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` // if using JWT
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">User Profile</h2>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5>Name:</h5>
              <p>{user.name}</p>
            </Col>
            <Col md={6}>
              <h5>Email:</h5>
              <p>{user.email}</p>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h5>Role:</h5>
              <p>{user.role}</p>
            </Col>
            <Col md={6}>
              <h5>Created On:</h5>
              <p>{new Date(user.createdDate).toLocaleDateString()}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
