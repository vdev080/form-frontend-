import React, { useState } from "react";
import { Container, Button, TextField, Typography, Box } from "@mui/material";
import axios from "axios";

const UserForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        pincode: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.number || !formData.pincode) {
            alert("Please fill all fields!");
            return;
        }

        try {
            await axios.post("http://localhost:9000/api/save-user", formData);
            setSubmitted(true);
        } catch (error) {
            console.error("Error saving data", error);
            alert("Error saving user data!");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
            {!showForm && !submitted && (
                <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
                    Start
                </Button>
            )}

            {showForm && !submitted && (
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Typography variant="h5">User Form</Typography>
                    <TextField label="First Name" name="firstName" onChange={handleChange} fullWidth margin="normal" required />
                    <TextField label="Last Name" name="lastName" onChange={handleChange} fullWidth margin="normal" required />
                    <TextField label="Email" name="email" type="email" onChange={handleChange} fullWidth margin="normal" required />
                    <TextField label="Number" name="number" type="tel" onChange={handleChange} fullWidth margin="normal" required />
                    <TextField label="Pincode" name="pincode" onChange={handleChange} fullWidth margin="normal" required />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </Box>
            )}

            {submitted && (
                <Typography variant="h5" color="success.main">
                    Thank you! Your details have been submitted.
                </Typography>
            )}
        </Container>
    );
};

export default UserForm;
