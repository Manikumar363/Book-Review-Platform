import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Rating,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import { fetchBookById } from '../../store/slices/booksSlice';
import { fetchBookReviews } from '../../store/slices/reviewsSlice';
import Loading from '../common/Loading';
import Error from '../common/Error';
import ReviewList from '../reviews/ReviewList';
import ReviewForm from '../reviews/ReviewForm';

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentBook: book, loading, error } = useSelector((state) => state.books);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBookById(id));
    dispatch(fetchBookReviews({ bookId: id }));
  }, [dispatch, id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!book) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src={book.coverImage || 'https://via.placeholder.com/300x450?text=No+Cover'}
              alt={book.title}
              sx={{
                width: '100%',
                maxWidth: 300,
                height: 'auto',
                objectFit: 'contain',
                mb: 2
              }}
            />
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography variant="h5" component="h1" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                by {book.author}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Rating value={book.averageRating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({book.totalReviews} reviews)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {book.genre?.map((genre) => (
                  <Chip key={genre} label={genre} size="small" />
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            {isAuthenticated && (
              <>
                <Typography variant="h6" gutterBottom>
                  Write a Review
                </Typography>
                <ReviewForm bookId={id} />
                <Divider sx={{ my: 3 }} />
              </>
            )}

            <Typography variant="h6" gutterBottom>
              Reviews
            </Typography>
            <ReviewList bookId={id} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetail;