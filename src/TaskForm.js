// TaskForm.jsx
import React, { useState } from "react";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const TaskForm = () => {
  const [form, setForm] = useState({
    taskName: "",
    pendingTask: "",
    status: "INPROGRESS",
    codingProblemsCount: 0,
    taskDate: new Date().toISOString().split("T")[0], // current date (YYYY-MM-DD)
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prevForm) => ({
    ...prevForm,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");
  setError("");

  try {
    const response = await axios.post("http://localhost:9999/admin/dailytask", form);

    const msg =
      typeof response.data === "string"
        ? response.data
        : response.data?.message;

    if (response.status === 201 || response.status === 200) {
      setMessage(msg || "✅ Task saved successfully.");
    } else {
      setError(msg || "⚠️ Unexpected response.");
    }
  } catch (err) {
    const status = err.response?.status;
    const msg =
      typeof err.response?.data === "string"
        ? err.response.data
        : err.response?.data?.message;

    if (status === 409) {
      setError(msg || "⚠️ Task for today is already recorded.");
    } else if (status === 503) {
      setError(msg || "🚫 ADMIN service is currently unavailable. Try again later.");
    } else {
      setError(msg || "❌ Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
      {message && <Alert variant="success" dismissible onClose={() => setMessage("")}>{message}</Alert>}
      {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="taskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="taskName"
              value={form.taskName}
              onChange={handleChange}
              required
              placeholder="Enter task name"
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="pendingTask">
            <Form.Label>Pending Task</Form.Label>
            <Form.Control
              type="text"
              name="pendingTask"
              value={form.pendingTask}
              onChange={handleChange}
              placeholder="Enter pending task"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="INPROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="codingProblemsCount">
            <Form.Label>Coding Problems Count</Form.Label>
            <Form.Control
              type="number"
              name="codingProblemsCount"
              value={form.codingProblemsCount}
              onChange={handleChange}
              min="0"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Form.Group controlId="taskDate">
            <Form.Label>Task Date</Form.Label>
            <Form.Control
              type="date"
              name="taskDate"
              value={form.taskDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </Form>
  );
};

export default TaskForm;
