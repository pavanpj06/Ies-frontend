import React, { useEffect, useState } from "react";
import { Table, Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ViewAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/accounts") // Change API endpoint accordingly
      .then(response => {
        setAccounts(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.mobile.includes(searchTerm)
  );

  return (
    <Container className="mt-4">
      <h3>View Account</h3>
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          className="w-25"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>S.NO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Gender</th>
            <th>SSN</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account, index) => (
              <tr key={account.id}>
                <td>{index + 1}</td>
                <td>{account.name}</td>
                <td>{account.email}</td>
                <td>{account.mobile}</td>
                <td>{account.gender}</td>
                <td>{account.ssn}</td>
                <td>
                  <Button variant="primary" size="sm">
                    <FaEdit /> Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" size="sm">
                    <FaTrash /> Delete
                  </Button>
                </td>
                <td>
                  <Button variant="info" size="sm">Details</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">No data found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewAccounts;
