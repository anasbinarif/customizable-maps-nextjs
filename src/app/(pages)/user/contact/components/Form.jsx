'use client';
import { TextField, Button, Typography, FormControl } from '@mui/material';
import { useTheme } from '@mui/material';
import React, { useState, useContext } from 'react';

import { StyledTextField } from '@/components/CustomTextFields';
import { ThemeContext } from '@/context/ThemeContext';

// import { FormContainer } from "../../components/mui/FleetPkgs";
// import { ServiceSubheading } from "../../components/mui/HomePkgs";
// import HeadingLinesAnimation from "../../components/Home/HeadingLinesAnimation/HeadingLinesAnimation";
// import { CustomFormButton, CustomFormTextField } from "../../components/mui/FormPkgs";

export default function Form({ onSubmit }) {
    const { darkMode } = useContext(ThemeContext);
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <FormControl
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(4),
                width: '100%',
                // maxWidth: "500px",
                // margin: "0 auto",
                // padding: theme.spacing(3),
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h2">Contact Us</Typography>
            <StyledTextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
            />
            <StyledTextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
            />
            <StyledTextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
            />
            <Button type="submit" fullWidth>
        Submit
            </Button>
        </FormControl>
    );
}
