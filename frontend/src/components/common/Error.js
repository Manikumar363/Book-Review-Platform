import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

const Error = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        textAlign: 'center',
        p: 3
      }}
    >
      <ErrorIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
      <Typography variant="h6" color="error" gutterBottom>
        Error
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          color="primary"
          onClick={onRetry}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default Error;