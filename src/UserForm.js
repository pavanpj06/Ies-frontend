import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const UserForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        emailId: '',
        mobileNumber: '',
        gender: '',
        dob: '',
        ssn: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <Container className="mt-5">
            <h2 className="text-success">Application Registration</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name*</Form.Label>
                    <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-50" // Bootstrap class to reduce width
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >Email ID*</Form.Label>
                    <Form.Control
                        type="email"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        required
                        className="w-50"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >Mobile Number*</Form.Label>
                    <Form.Control
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        className="w-50"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >Gender*</Form.Label>
                    <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-50"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >Date of Birth*</Form.Label>
                    <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className="w-50"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >SSN*</Form.Label>
                    <Form.Control
                        type="text"
                        name="ssn"
                        value={formData.ssn}
                        onChange={handleChange}
                        required
                        className="w-50"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default UserForm;
