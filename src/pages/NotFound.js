import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The page you are looking for does not exist.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;