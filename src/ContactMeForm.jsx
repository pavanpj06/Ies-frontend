import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const ContactMeForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    message: "",
    document: null, // this will hold the selected file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      document: e.target.files[0],
    }));
  };

const ARAPI_URL = process.env.REACT_APP_BASE_URL;

  //

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("middleName", formData.middleName);
    data.append("lastName", formData.lastName);
    data.append("message", formData.message);
    data.append("document", formData.document); // actual file

 fetch(`${ARAPI_URL}/admin/contact-me`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.text())
      .then((msg) => alert("Server Response: " + msg))
      .catch((err) => console.error("Upload error", err));
  };

  return (
    <Container className="p-4">
      <h4>Contact Me Form</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Middle Name (Optional)</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name *</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message *</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            required
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Document *</Form.Label>
          <Form.Control
            type="file"
            name="document"
            required
            onChange={handleFileChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ContactMeForm;
