import React from "react";
import { Container, Row, Col, Card, Navbar, Nav, Form, InputGroup, Accordion } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaMoneyBill, FaUsers, FaHeart, FaBars } from "react-icons/fa";
import { BiClipboard } from "react-icons/bi";
import { Outlet } from "react-router-dom"; 

const Dashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-light p-3 vh-100" style={{ width: "250px" }}>
        <h4 className="text-danger fw-bold">IES Integration</h4>
        <Nav className="flex-column">
          <Nav.Link href="#">📊 Dashboard</Nav.Link>

          <Accordion>
            <Accordion.Item eventKey="1">
              <Accordion.Header>📋 Application Registration</Accordion.Header>
              <Accordion.Body>
                <Nav.Link href="/dashboard-page/create-application-page">Create Application</Nav.Link>
                <Nav.Link href="/dashboard-page/view-applications">View Applications</Nav.Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item eventKey="2">
              <Accordion.Header>📈 Data Collection</Accordion.Header>
              <Accordion.Body>
                <Nav.Link href="/dashboard-page/plan-selection-page">Plan Selection</Nav.Link>
                <Nav.Link href="/dashboard-page/income-details-page">Income Details</Nav.Link>
                <Nav.Link href="/dashboard-page/education-details-page">Education Details</Nav.Link>
                <Nav.Link href="/dashboard-page/kid-details-form-page">Kids Details</Nav.Link>
                <Nav.Link href="/dashboard-page/summary">Summary Screen</Nav.Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item eventKey="3">
              <Accordion.Header>📑 Eligibility Determination</Accordion.Header>
              <Accordion.Body>
                <Nav.Link href="/dashboard-page/eligibility-form-page">Determine Eligibility</Nav.Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Nav.Link href="#">📧 Correspondence</Nav.Link>
          <Nav.Link href="#">🎁 Benefit Issuance</Nav.Link>
          <Nav.Link href="#">📜 Reports</Nav.Link>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>⚙️ Admin</Accordion.Header>
              <Accordion.Body>
                <Nav.Link href="/dashboard-page/user-account-creation">Create Account</Nav.Link>
                <Nav.Link href="/dashboard-page/view-accounts-page">View Accounts</Nav.Link>
                <Nav.Link href="/dashboard-page/create-plan-page">
                  <BiClipboard className="me-1" /> Create Plan
                </Nav.Link>
                <Nav.Link href="/dashboard-page/view-plans">View Plans</Nav.Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="content flex-grow-1">
        <Navbar bg="white" className="shadow-sm px-3">
          <FaBars size={24} className="me-3" />
          <Form className="d-flex w-100">
            <InputGroup>
              <Form.Control type="text" placeholder="Search Dashboard" />
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
          <div className="ms-3">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="rounded-circle"
            />
          </div>
        </Navbar>

        {/* Default Dashboard Cards */}
        <Container className="mt-4">
          <Row>
            <Col md={3}>
              <Card className="text-white bg-primary">
                <Card.Body>
                  <Card.Title>No. of Plans Available</Card.Title>
                  <h2>23</h2>
                  <p>Jan 2022 - May 2023</p>
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

        {/* 👇 Renders nested route here */}
        <div className="mt-4 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
