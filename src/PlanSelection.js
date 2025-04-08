import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const PlanSelection = () => {
  const [formData, setFormData] = useState({
    caseNumber: "",
    planName: "SNAP",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <Container className="mt-5">
      <h3>Plan Selection</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Case Number</Form.Label>
          <Form.Control
            type="text"
            name="caseNumber"
            value={formData.caseNumber}
            onChange={handleChange}
            placeholder="Enter Case Number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Plan Name</Form.Label>
          <Form.Select
            name="planName"
            value={formData.planName}
            onChange={handleChange}
          >
            <option value="SNAP">SNAP</option>
            <option value="Medicaid">Medicaid</option>
            <option value="TANF">TANF</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default PlanSelection;
