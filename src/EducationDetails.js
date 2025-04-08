import React, { useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

const EducationDetails = () => {
  // State to manage form inputs
  const [caseNumber, setCaseNumber] = useState("");
  const [highestDegree, setHighestDegree] = useState("");
  const [graduationYear, setGraduationYear] = useState("2020");
  const [universityName, setUniversityName] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      caseNumber,
      highestDegree,
      graduationYear,
      universityName,
    });
    // Add your logic here to process the form data
  };

  return (
    <Container>
      <h2>Education Details</h2>
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

        {/* Highest Degree and Graduation Year (Side by Side) */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="highestDegree">
              <Form.Label>Highest Degree</Form.Label>
              <FormControl
                type="text"
                value={highestDegree}
                onChange={(e) => setHighestDegree(e.target.value)}
                placeholder="Enter Highest Degree"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="graduationYear">
              <Form.Label>Graduation Year</Form.Label>
              <DropdownButton
                id="dropdown-basic-button"
                title={graduationYear}
                variant="outline-secondary"
                onSelect={(year) => setGraduationYear(year)}
              >
                <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
                <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
                <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
                <Dropdown.Item eventKey="2023">2023</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
          </Col>
        </Row>

        {/* University Name */}
        <Form.Group controlId="universityName">
          <Form.Label>University Name</Form.Label>
          <FormControl
            type="text"
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
            placeholder="Enter University Name"
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default EducationDetails;