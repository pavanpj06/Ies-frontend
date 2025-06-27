import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Spinner, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [greeting, setGreeting] = useState("Welcome Back!");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/get-message-basedon-time`);
        setGreeting(res.data?.message || "Welcome Back!");
      } catch {
        setGreeting("Welcome Back!");
      }
    };
    fetchGreeting();
  }, [BASE_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("caseNumber", data.caseNumber);
      navigate("/dashboard-page");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChat = () => {
    setChatVisible((prev) => {
      if (!prev && chatMessages.length === 0) {
        setChatMessages([]);
      }
      return !prev;
    });
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: chatInput.trim(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setListening(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/get-name-info", {
        name: userMessage.text,
      });

      const alexaMessage = {
        id: Date.now() + 1,
        sender: "alexa",
        text: res.data.response,
      };

      setChatMessages((prev) => [...prev, alexaMessage]);
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "alexa",
          text: "❌ Sorry, something went wrong.",
        },
      ]);
    } finally {
      setListening(false);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: suggestion,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setListening(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/get-name-info", {
        name: suggestion,
      });

      const alexaMessage = {
        id: Date.now() + 1,
        sender: "alexa",
        text: res.data.response,
      };

      setChatMessages((prev) => [...prev, alexaMessage]);
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "alexa",
          text: "❌ Sorry, something went wrong.",
        },
      ]);
    } finally {
      setListening(false);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        position: "relative",
      }}
    >
      {/* Contact */}
      <div className="mb-3">
        <Link to="/contact-me" className="text-white text-decoration-underline fw-semibold">
          Contact Me
        </Link>
      </div>

      {/* Login Card */}
      <div
        className="bg-white p-4 rounded-4 shadow d-flex flex-column align-items-center"
        style={{ width: "400px" }}
      >
        <h2 className="text-center text-primary mb-3">{greeting}</h2>
        <h4 className="text-center mb-4">Login</h4>

        {error && <div className="text-danger text-center mb-3">{error}</div>}

        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group className="mb-3">
            <InputGroup>
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <InputGroup>
              <InputGroup.Text>
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            variant="primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Link
            to="/forgot-password-page"
            className="text-decoration-underline text-primary"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={handleToggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 9999,
          fontSize: "1.5rem",
        }}
        aria-label="Chat with Alexa"
      >
        💬
      </button>

      {/* Chat Window */}
      {chatVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            maxHeight: "400px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#007bff",
              color: "white",
              padding: "0.75rem",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              fontWeight: "bold",
            }}
          >
            Alexa Chat
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" ? "#dcf8c6" : "#f1f0f0",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "12px",
                  maxWidth: "85%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.text}
              </div>
            ))}

            {chatMessages.length === 0 && (
              <div style={{ padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "You need user ID & password",
                  "You need a joke",
                  "You need help with login",
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={listening}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              padding: "0.5rem",
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <Form.Control
              type="text"
              placeholder="Ask Alexa..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={listening}
            />
            <Button
              onClick={handleSendChat}
              disabled={listening}
              variant="primary"
            >
              {listening ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Send"
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className="mt-3 text-white text-center"
        style={{ fontSize: "0.9rem" }}
      >
        &copy; {new Date().getFullYear()} PavanPonnella. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
