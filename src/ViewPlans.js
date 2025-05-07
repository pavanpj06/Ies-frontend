import React, { useEffect, useState } from "react";
import { Table, Button, Container, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const ViewPlans = () => {
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/view-all-plans?page=${page}&size=${size}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans(response.data.content);
        setTotalPages(response.data.totalPages);
        setPage(response.data.number);
        setError(null);
      } catch (error) {
        setError("Error fetching plan data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [page, size, BASE_URL]);

  const filteredPlans = plans.filter((plan) =>
    plan.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (plan.createByUser && plan.createByUser.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container className="mt-4">
      <h3>View Plans</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name or user..."
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
                <th>Plan Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan, index) => (
                  <tr key={index}>
                    <td>{page * size + index + 1}</td>
                    <td>{plan.planName}</td>
                    <td>{plan.startDate}</td>
                    <td>{plan.endDate || "N/A"}</td>
                    <td>{plan.createByUser || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No plans found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
            <Button
              variant="secondary"
              onClick={() => setPage(prev => prev - 1)}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() => setPage(prev => prev + 1)}
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

export default ViewPlans;
