import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
  Form,
  InputGroup,
  Accordion,
  Dropdown,
} from "react-bootstrap";
import {
  FaSearch,
  FaShoppingCart,
  FaMoneyBill,
  FaUsers,
  FaHeart,
  FaBars,
} from "react-icons/fa";
import { BiClipboard } from "react-icons/bi";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [planStats, setPlanStats] = useState(null); // Corrected: previously planCount

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchPlanStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/get-all-plans-count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPlanStats(data); // Set the correct response to planStats
      } catch (error) {
        console.error("Failed to fetch plan stats:", error);
      }
    };

    fetchPlanStats();
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar bg-light p-3 vh-100 ${isSidebarVisible ? "" : "d-none"}`}
        style={{ width: "250px", overflowY: "auto" }}
      >
        <h4 className="text-danger fw-bold">IES Integration</h4>
        <Nav className="flex-column">
          <Nav.Link href="#">📊 Dashboard</Nav.Link>
          <Accordion alwaysOpen defaultActiveKey={[]}>
            <Accordion.Item eventKey="1">
              <Accordion.Header>📋 Application Registration</Accordion.Header>
              <Accordion.Body className="p-0 ps-3">
                <Nav.Link href="/dashboard-page/create-application-page">Create Application</Nav.Link>
                <Nav.Link href="/dashboard-page/view-applications">View Applications</Nav.Link>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>📈 Data Collection</Accordion.Header>
              <Accordion.Body className="p-0 ps-3">
                <Nav.Link href="/dashboard-page/plan-selection-page">Plan Selection</Nav.Link>
                <Nav.Link href="/dashboard-page/income-details-page">Income Details</Nav.Link>
                <Nav.Link href="/dashboard-page/education-details-page">Education Details</Nav.Link>
                <Nav.Link href="/dashboard-page/kid-details-form-page">Kids Details</Nav.Link>
                <Nav.Link href="/dashboard-page/summary">Summary Screen</Nav.Link>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>📑 Eligibility Determination</Accordion.Header>
              <Accordion.Body className="p-0 ps-3">
                <Nav.Link href="/dashboard-page/eligibility-form-page">Determine Eligibility</Nav.Link>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>⚙️ Admin</Accordion.Header>
              <Accordion.Body className="p-0 ps-3">
                <Nav.Link href="/dashboard-page/user-account-creation">Create Account</Nav.Link>
                <Nav.Link href="/dashboard-page/view-accounts-page">View Accounts</Nav.Link>
                <Nav.Link href="/dashboard-page/create-plan-page">
                  <BiClipboard className="me-1" /> Create Plan
                </Nav.Link>
                <Nav.Link href="/dashboard-page/view-plans">View Plans</Nav.Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Nav.Link href="#">📧 Correspondence</Nav.Link>
          <Nav.Link href="#">🎁 Benefit Issuance</Nav.Link>
          <Nav.Link href="#">📜 Reports</Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="content flex-grow-1">
        <Navbar bg="white" className="shadow-sm px-3 d-flex align-items-center">
          <FaBars
            size={24}
            className="me-3"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            role="button"
          />
          <Form className="d-flex w-100">
            <InputGroup>
              <Form.Control type="text" placeholder="Search Dashboard" />
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
          <Dropdown align="end" className="ms-3">
            <Dropdown.Toggle variant="light" className="border-0 p-0 bg-transparent">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="rounded-circle"
                style={{ width: "40px", height: "40px" }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/dashboard-page/profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>

        {/* Dashboard Cards */}
        <Container className="mt-4">
          <Row>
            <Col md={3}>
              <Card className="text-white bg-primary">
                <Card.Body>
                  <Card.Title>No. of Plans Available</Card.Title>
                  <h2>{planStats ? planStats.planCount : "Loading..."}</h2>
                  <p>
                    {planStats ? `${planStats.startDate} - ${planStats.endDate}` : "Loading..."}
                  </p>
                  <FaShoppingCart size={30} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-white bg-danger">
                <Card.Body>
                  <Card.Title>Citizens Approved</Card.Title>
                  <h2>8,577,641</h2>
                  <p>Jan 2022 - May 2023</p>
                  <FaMoneyBill size={30} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-white bg-warning">
                <Card.Body>
                  <Card.Title>Citizens Denied</Card.Title>
                  <h2>4,565</h2>
                  <p>Jan 2022 - May 2023</p>
                  <FaUsers size={30} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-white bg-info">
                <Card.Body>
                  <Card.Title>Benefits Given</Card.Title>
                  <h2>$12,566</h2>
                  <p>Jan 2022 - May 2023</p>
                  <FaHeart size={30} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Nested Routes */}
        <div className="mt-4 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
