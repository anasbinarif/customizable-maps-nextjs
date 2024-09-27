'use client';
import {Button, FormControl, Typography, useTheme} from '@mui/material';
import React, { useState} from 'react';

import {StyledTextField} from '@/components/CustomTextFields';

export default function Form({ onSubmit }) {
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
