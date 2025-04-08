import React, { useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const KidDetailsForm = () => {
  // State to manage form inputs
  const [caseNumber, setCaseNumber] = useState("");
  const [kids, setKids] = useState([
    { name: "", age: "", ssn: "" },
    { name: "", age: "", ssn: "" },
  ]);

  // Function to handle case number change
  const handleCaseNumberChange = (e) => {
    setCaseNumber(e.target.value);
  };

  // Function to add a new kid
  const addKid = () => {
    setKids([...kids, { name: "", age: "", ssn: "" }]);
  };

  // Function to handle kid input changes
  const handleKidInputChange = (index, field, value) => {
    const updatedKids = [...kids];
    updatedKids[index][field] = value;
    setKids(updatedKids);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      caseNumber,
      kids,
    });
    // Add your logic here to process the form data
  };

  return (
    <Container>
      {/* Case Number */}
      <Form.Group controlId="caseNumber">
        <Form.Label>Case Number</Form.Label>
        <FormControl
          type="text"
          value={caseNumber}
          onChange={handleCaseNumberChange}
          placeholder="Enter Case Number"
        />
      </Form.Group>

      {/* Add Kid Button */}
      <Button variant="primary" onClick={addKid}>
        Add Kid
      </Button>

      {/* Kids Input Fields */}
      {kids.map((kid, index) => (
        <Row key={index} className="mt-3">
          <Col md={4}>
            <Form.Group controlId={`kidName-${index}`}>
              <Form.Label>Kid Name</Form.Label>
              <FormControl
                type="text"
                value={kid.name}
                onChange={(e) =>
                  handleKidInputChange(index, "name", e.target.value)
                }
                placeholder="Enter Kid Name"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId={`kidAge-${index}`}>
              <Form.Label>Kid Age</Form.Label>
              <FormControl
                type="number"
                value={kid.age}
                onChange={(e) =>
                  handleKidInputChange(index, "age", e.target.value)
                }
                placeholder="Enter Kid Age"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId={`kidSSN-${index}`}>
              <Form.Label>Kid SSN</Form.Label>
              <FormControl
                type="text"
                value={kid.ssn}
                onChange={(e) =>
                  handleKidInputChange(index, "ssn", e.target.value)
                }
                placeholder="Enter Kid SSN"
              />
            </Form.Group>
          </Col>
        </Row>
      ))}

      {/* Submit Button */}
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default KidDetailsForm;