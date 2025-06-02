import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Rating,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import {
  Book as BookIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import { fetchBookById } from '../store/slices/booksSlice';
import { fetchReviews } from '../store/slices/reviewsSlice';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { book, loading: bookLoading, error: bookError } = useSelector((state) => state.books);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    dispatch(fetchBookById(id));
    dispatch(fetchReviews({ book: id }));
  }, [dispatch, id]);

  if (bookLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (bookError) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ my: 2 }}>
          {bookError}
        </Alert>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxWidth="lg">
        <Alert severity="info" sx={{ my: 2 }}>
          Book not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Book Cover and Basic Info */}
        <Grid item xs={12} md={4}>
          <Paper
            component="img"
            src={book.coverImage}
            alt={book.title}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: 3
            }}
          />
        </Grid>

        {/* Book Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {book.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={book.averageRating} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({book.reviewCount} reviews)
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                  <strong>Published:</strong> {new Date(book.publishedDate).getFullYear()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LanguageIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <BookIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Genres:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {book.genres.map((genre) => (
                <Chip key={genre} label={genre} />
              ))}
            </Box>
          </Box>

          {isAuthenticated && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </Button>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Reviews Section */}
      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Reviews
        </Typography>
        {showReviewForm && (
          <Box sx={{ mb: 4 }}>
            <ReviewForm
              bookId={id}
              onSuccess={() => setShowReviewForm(false)}
            />
          </Box>
        )}
        <ReviewList bookId={id} />
      </Box>
    </Container>
  );
};

export default BookDetail;