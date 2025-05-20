import React, { useEffect, useState, useMemo } from "react";
import { saveAs } from "file-saver";
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
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ViewAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [sortField, setSortField] = useState("fullName");
  const [sortOrder, setSortOrder] = useState("asc");
const [downloadingExcel, setDownloadingExcel] = useState(false);
  useEffect(() => {
    fetchAccounts();
    // eslint-disable-next-line
  }, [page, size, sortField, sortOrder]);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${BASE_URL}/fetch-all-user-accounts?page=${page}&size=${size}&sortField=${sortField}&sortOrder=${sortOrder}`,
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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;
    return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this account?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${BASE_URL}/delete-by-id/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200 && res.data.message) {
        alert(res.data.message);
        fetchAccounts();
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      alert("Failed to delete account. Please try again.");
      console.error(err);
    }
  };

  const startEditing = (account) => {
    setEditingId(account.id);
    setEditForm({ ...account });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/edit-user-account/${editForm.id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      cancelEditing();
      fetchAccounts();
    } catch {
      alert("Failed to save changes. Please try again.");
    }
  };

  const filteredAccounts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return accounts.filter((acc) =>
      [acc.fullName, acc.email, acc.mobileNumber].some((field) =>
        (field || "").toLowerCase().includes(term)
      )
    );
  }, [accounts, searchTerm]);





  const handleExcelDownload = async () => {
     setDownloadingExcel(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/export-records-inexcel`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "Accounts.xlsx");
    } catch (error) {
      alert("Failed to download Excel");
      console.error(error);
    }

    finally {
      setDownloadingExcel(false);  // stop loading
    }
  };
const handleTxtDownload = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/download/accounts-txt`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = new Blob([response.data], {
      type: "text/plain",
    });

    saveAs(blob, "Accounts.txt");
  } catch (error) {
    alert("Failed to download TXT file");
    console.error(error);
  }
};

  return (
    <Container className="mt-4">
      <h4 className="mb-3" style={{ fontSize: "1.25rem" }}>View Accounts</h4>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-2 align-items-center">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search..."
            size="sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Form.Select
            size="sm"
            value={size}
            onChange={(e) => {
              setPage(0);
              setSize(Number(e.target.value));
            }}
          >
            {[5, 10, 50, 100].map((n) => (
              <option key={n} value={n}>{n} records</option>
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
          <Table responsive striped bordered hover size="sm">
            <thead className="table-light">
              <tr style={{ fontSize: "0.9rem" }}>
                <th>S.NO</th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort("fullName")}>
                  Name {renderSortIcon("fullName")}
                </th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort("email")}>
                  Email {renderSortIcon("email")}
                </th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort("mobileNumber")}>
                  Mobile {renderSortIcon("mobileNumber")}
                </th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort("gender")}>
                  Gender {renderSortIcon("gender")}
                </th>
                <th style={{ cursor: "pointer" }} onClick={() => handleSort("ssNumber")}>
                  SSN {renderSortIcon("ssNumber")}
                </th>
                <th className="text-center" colSpan={3}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((acc, idx) => {
                  const isEditing = editingId === acc.id;
                  const isFirst = idx === 0;

                  return (
                    <tr key={acc.id} style={{ fontSize: "0.88rem" }}>
                      <td>{page * size + idx + 1}</td>
                      <td>
                        {isEditing ? (
                          <Form.Control
                            size="sm"
                            name="fullName"
                            value={editForm.fullName}
                            onChange={handleEditChange}
                            disabled={isFirst}
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
                            value={editForm.mobileNumber}
                            onChange={handleEditChange}
                            disabled={isFirst}
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
                            value={editForm.gender}
                            onChange={handleEditChange}
                            disabled={isFirst}
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
                          {!isEditing ? (
                            <>
                              <Button
                                size="sm"
                                variant="primary"
                                onClick={() => startEditing(acc)}
                                disabled={isFirst}
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleDelete(acc.id)}
                                disabled={isFirst}
                              >
                                <FaTrash />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={cancelEditing}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                variant="success"
                                onClick={handleSave}
                              >
                                Save
                              </Button>
                            </>
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

          <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
            <div className="d-flex align-items-center gap-3">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 0}
              >
                Previous
              </Button>
              <span style={{ fontSize: "0.9rem" }}>
                Page {page + 1} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page + 1 === totalPages}
              >
                Next
              </Button>
            </div>

            <div className="d-flex gap-2 mt-2 mt-sm-0">
              {/* <a
                href={`${BASE_URL}/download/excel`}
                className="btn btn-success btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Excel
              </a> */}
              {/* <Button size="sm" variant="success" onClick={handleExcelDownload}>
                Download Excel
              </Button> */}

              <Button
        size="sm"
        variant="success"
        onClick={handleExcelDownload}
        disabled={downloadingExcel}
      >
        {downloadingExcel ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Downloading...
          </>
        ) : (
          "Download Excel"
        )}
      </Button>
 <Button size="sm" variant="warning" onClick={handleTxtDownload}>
    Download TXT
  </Button>
              <a
                href={`${BASE_URL}/download/csv`}
                className="btn btn-info btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CSV
              </a>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default ViewAccounts;
