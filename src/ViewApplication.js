import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

const ViewApplication = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  
  const ARAPI_URL= process.env.REACT_APP_AR_API_URL;
  useEffect(() => {
    axios.get(`${ARAPI_URL}/fetch-all-application-records`)
      .then((response) => {
        setRecords(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch records');
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;

  return (
    <Container className="mt-5">
      <h3>Application Records</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Case Number</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>SSN</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.caseNumber}>
              <td>{rec.caseNumber}</td>
              <td>{rec.fullName}</td>
              <td>{rec.email}</td>
              <td>{rec.phoneNum}</td>
              <td>{rec.gender}</td>
              <td>{rec.dob}</td>
              <td>{rec.ssn}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewApplication;
