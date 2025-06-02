import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Rating,
  Typography,
  Paper,
  Alert
} from '@mui/material';
import { createReview, updateReview } from '../../store/slices/reviewsSlice';

const ReviewForm = ({ bookId, existingReview = null, onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.reviews);
  const [formData, setFormData] = useState({
    title: existingReview?.title || '',
    content: existingReview?.content || '',
    rating: existingReview?.rating || 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      rating: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      ...formData,
      book: bookId
    };

    try {
      if (existingReview) {
        await dispatch(updateReview({ id: existingReview._id, reviewData })).unwrap();
      } else {
        await dispatch(createReview(reviewData)).unwrap();
      }
      setFormData({
        title: '',
        content: '',
        rating: 0
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {existingReview ? 'Edit Review' : 'Write a Review'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={formData.rating}
            onChange={handleRatingChange}
            precision={0.5}
            size="large"
          />
        </Box>

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Review"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !formData.rating || !formData.title || !formData.content}
        >
          {loading ? 'Submitting...' : existingReview ? 'Update Review' : 'Submit Review'}
        </Button>
      </form>
    </Paper>
  );
};

export default ReviewForm;