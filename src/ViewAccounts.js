import React, { useEffect, useState } from "react";
import { Table, Button, Container, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ViewAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchAccounts();
  }, [page, size, BASE_URL]);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/fetch-all-user-accounts?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(response.data.content);
      setTotalPages(response.data.totalPages);
      setPage(response.data.number);
      setError(null);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this account?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/delete-by-id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh data after deletion
      fetchAccounts();
    } catch (error) {
      alert("Failed to delete account. Please try again.");
    }
  };

  const filteredAccounts = accounts.filter((account) =>
    account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.mobileNumber.includes(searchTerm)
  );

  return (
    <Container className="mt-4">
      <h3>View Accounts</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          className="w-25"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Form.Select
          className="w-auto"
          value={size}
          onChange={(e) => {
            setPage(0);
            setSize(parseInt(e.target.value));
          }}
        >
          <option value={5}>5 records</option>
          <option value={10}>10 records</option>
          <option value={50}>50 records</option>
          <option value={100}>100 records</option>
        </Form.Select>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
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
                    <td>{page * size + index + 1}</td>
                    <td>{account.fullName}</td>
                    <td>{account.email}</td>
                    <td>{account.mobileNumber}</td>
                    <td>{account.gender}</td>
                    <td>{account.ssNumber}</td>
                    <td>
                      <Button variant="primary" size="sm">
                        <FaEdit /> Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(account.id)}
                      >
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

          <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
            <Button
              variant="secondary"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page + 1 === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default ViewAccounts;
