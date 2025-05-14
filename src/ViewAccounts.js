import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  Button,
  Container,
  Form,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ViewAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAccounts();
    // eslint-disable-next-line
  }, [page, size]);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${BASE_URL}/fetch-all-user-accounts?page=${page}&size=${size}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAccounts(data.content);
      setTotalPages(data.totalPages);
      setPage(data.number);
      setError(null);
    } catch {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${BASE_URL}/delete-by-id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.message) {
        alert(response.data.message); // Optional: Show success message
        fetchAccounts(); // Refresh list
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      alert("Failed to delete account. Please try again later.");
      console.error("Delete error:", error);
    }
  };

  const handleChange = (e, accountId) => {
    const { name, value } = e.target;
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === accountId ? { ...acc, [name]: value } : acc))
    );
  };

  const handleSave = async (account) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASE_URL}/edit-user-account/${account.id}`, account, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingAccountId(null);
      fetchAccounts();
    } catch {
      alert("Failed to save changes. Please try again.");
    }
  };

  const filteredAccounts = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
    return accounts.filter((acc) =>
      [acc.fullName, acc.email, acc.mobileNumber].some((field) =>
        (field || "").toLowerCase().includes(lowerTerm)
      )
    );
  }, [accounts, searchTerm]);

  return (
    <Container className="mt-4">
      <h3>View Accounts</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Form.Select
            value={size}
            onChange={(e) => {
              setPage(0);
              setSize(Number(e.target.value));
            }}
          >
            {[5, 10, 50, 100].map((val) => (
              <option key={val} value={val}>
                {val} records
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Table responsive striped bordered hover>
            <thead className="table-light">
              <tr>
                <th>S.NO</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>SSN</th>
                <th className="text-center" colSpan={3}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.length ? (
                filteredAccounts.map((acc, idx) => {
                  const isFirstRecord = idx === 0;
                  const isEditing = editingAccountId === acc.id && !isFirstRecord;

                  return (
                    <tr key={acc.id}>
                      <td>{page * size + idx + 1}</td>
                      <td>
                        {isEditing ? (
                          <Form.Control
                            size="sm"
                            name="fullName"
                            value={acc.fullName}
                            onChange={(e) => handleChange(e, acc.id)}
                            disabled={isFirstRecord}
                          />
                        ) : (
                          acc.fullName
                        )}
                      </td>
                      <td>{acc.email}</td>
                      <td>
                        {isEditing ? (
                          <Form.Control
                            size="sm"
                            name="mobileNumber"
                            value={acc.mobileNumber}
                            onChange={(e) => handleChange(e, acc.id)}
                            disabled={isFirstRecord}
                          />
                        ) : (
                          acc.mobileNumber
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <Form.Select
                            size="sm"
                            name="gender"
                            value={acc.gender}
                            onChange={(e) => handleChange(e, acc.id)}
                            disabled={isFirstRecord}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        ) : (
                          acc.gender
                        )}
                      </td>
                      <td>{acc.ssNumber}</td>
                      <td colSpan={3}>
                        <div className="d-flex justify-content-center gap-2 flex-wrap">
                          <Button
                            size="sm"
                            variant={isEditing ? "secondary" : "primary"}
                            onClick={() => setEditingAccountId(isEditing ? null : acc.id)}
                            disabled={isFirstRecord}
                          >
                            {isEditing ? "Cancel" : <FaEdit />}
                          </Button>

                          {!isEditing && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(acc.id)}
                              disabled={isFirstRecord}
                            >
                              <FaTrash />
                            </Button>
                          )}

                          {isEditing && (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleSave(acc)}
                              disabled={isFirstRecord}
                            >
                              Save
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center align-items-center gap-3 mt-3 flex-wrap">
            <Button
              variant="secondary"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() => setPage((p) => p + 1)}
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
