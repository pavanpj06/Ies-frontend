import React, { useState } from "react";
import { Form, FormControl, Button, Container, Row, Col } from "react-bootstrap";

const IncomeDetails = () => {
  // State to manage form inputs
  const [caseNumber, setCaseNumber] = useState("");
  const [monthlySalaryIncome, setMonthlySalaryIncome] = useState("");
  const [rentIncome, setRentIncome] = useState("");
  const [propertyIncome, setPropertyIncome] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      caseNumber,
      monthlySalaryIncome,
      rentIncome,
      propertyIncome,
    });
    // Add your logic here to process the form data
  };

  return (
    <Container>
      <h2>Income Details</h2>
      <Form onSubmit={handleSubmit}>
        {/* Case Number */}
        <Form.Group controlId="caseNumber">
          <Form.Label>Case Number</Form.Label>
          <FormControl
            type="text"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            placeholder="Enter Case Number"
          />
        </Form.Group>

        {/* Monthly Salary Income and Rent Income (Side by Side) */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="monthlySalaryIncome">
              <Form.Label>Monthly Salary Income</Form.Label>
              <FormControl
                type="text"
                value={monthlySalaryIncome}
                onChange={(e) => setMonthlySalaryIncome(e.target.value)}
                placeholder="Enter Monthly Salary Income"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="rentIncome">
              <Form.Label>Rent Income</Form.Label>
              <FormControl
                type="text"
                value={rentIncome}
                onChange={(e) => setRentIncome(e.target.value)}
                placeholder="Enter Rent Income"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Property Income */}
        <Form.Group controlId="propertyIncome">
          <Form.Label>Property Income</Form.Label>
          <FormControl
            type="text"
            value={propertyIncome}
            onChange={(e) => setPropertyIncome(e.target.value)}
            placeholder="Enter Property Income"
          />
        </Form.Group>
       
        <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </Container>
  );
};

export default IncomeDetails;