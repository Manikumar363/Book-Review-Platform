import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, CircularProgress } from '@mui/material';
import ReviewCard from './ReviewCard';

const ReviewList = ({ bookId }) => {
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const bookReviews = reviews.filter(review => review.book === bookId);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ my: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (bookReviews.length === 0) {
    return (
      <Box sx={{ my: 2 }}>
        <Typography variant="body1" color="text.secondary">
          No reviews yet. Be the first to review this book!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reviews ({bookReviews.length})
      </Typography>
      {bookReviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </Box>
  );
};

export default ReviewList;