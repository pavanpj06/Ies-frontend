import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

function EligibilityForm() {
  const [caseNumber, setCaseNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Checking eligibility for case number: ${caseNumber}`);
    // Add your eligibility logic here
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h4 className="mb-4">Eligibility Determination</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Case Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter case number"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Determine Eligibility
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default EligibilityForm;
