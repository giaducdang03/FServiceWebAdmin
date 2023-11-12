import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddForm() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            image: '',
            description: '',
            duration: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required').min(3, 'Must be 3 characters or more'),
            image: Yup.string().required('Required').url('Please enter a valid URL'),
            description: Yup.string().required('Required'),
            duration: Yup.number().required('Required').max(120, 'Duration must be between 1 and 120'),
        }),
        onSubmit: async (values) => {
            try {
                await axios.post('https://fservices.azurewebsites.net/api/packages', values);
                toast.success('Package added successfully!');
                navigate('/packages');
            } catch (error) {
                toast.error('Error adding package');
                console.error('Error Adding Package', error);
            }
        },
    });

    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    Add New Package
                </Typography>
                <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        aria-label="Name"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        aria-label="Description"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Duration"
                        name="duration"
                        value={formik.values.duration}
                        onChange={formik.handleChange}
                        error={formik.touched.duration && Boolean(formik.errors.duration)}
                        helperText={formik.touched.duration && formik.errors.duration}
                        aria-label="Duration"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Image URL"
                        name="image"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        error={formik.touched.image && Boolean(formik.errors.image)}
                        helperText={formik.touched.image && formik.errors.image}
                        aria-label="Image URL"
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        Add Package
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default AddForm;
