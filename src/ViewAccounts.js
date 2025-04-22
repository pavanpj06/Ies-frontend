import React, { useEffect, useState } from "react";
import { Table, Button, Container, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ViewAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Fetch data from backend
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from storage
        const response = await axios.get(`${BASE_URL}/fetch-all-user-accounts`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the request header
          },
        });
        setAccounts(response.data); // Store the data in the state
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after request is done
      }
    };

    fetchAccounts();
  }, [BASE_URL]);

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter((account) =>
    account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.mobileNumber.includes(searchTerm)
  );

  return (
    <Container className="mt-4">
      <h3>View Accounts</h3>
      
      {/* Display error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Search form */}
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          className="w-25"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div>Loading...</div>
      ) : (
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
                  <td>{account.fullName}</td> {/* Displaying fullName instead of name */}
                  <td>{account.email}</td>
                  <td>{account.mobileNumber}</td> {/* Displaying mobileNumber */}
                  <td>{account.gender}</td>
                  <td>{account.ssNumber}</td> {/* Displaying ssNumber */}
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
                    <Button variant="info" size="sm">
                      Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewAccounts;
