import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Divider,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { fetchBooks } from '../store/slices/booksSlice';
import { fetchReviews } from '../store/slices/reviewsSlice';
import BookCard from '../components/books/BookCard';
import ReviewCard from '../components/reviews/ReviewCard';
import bookshelvesBackground from '../assets/Bg-for-home.jpg';

const Home = () => {
  const dispatch = useDispatch();
  const { books, loading: booksLoading } = useSelector((state) => state.books);
  const { reviews, loading: reviewsLoading } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchBooks({ limit: 6 }));
    dispatch(fetchReviews({ limit: 4 }));
  }, [dispatch]);

  const featuredBooks = books.slice(0, 3);
  const latestReviews = reviews.slice(0, 4);

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${bookshelvesBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          py: 8,
          px: 4,
          borderRadius: 2,
          mb: 6,
          textAlign: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 2,
            zIndex: 1,
          },
          '& > *': {
            position: 'relative',
            zIndex: 2,
          },
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to BookReview
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Discover, Read, and Share Your Thoughts
        </Typography>
        <Button
          component={RouterLink}
          to="/books"
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            bgcolor: 'white',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          Explore Books
        </Button>
      </Box>

      {/* Featured Books Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Books
        </Typography>
        <Grid container spacing={4}>
          {featuredBooks.map((book) => (
            <Grid item xs={12} md={4} key={book._id}>
              <Card
                component={RouterLink}
                to={`/books/${book._id}`}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={book.coverImage}
                  alt={book.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h3">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    by {book.author}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating value={book.averageRating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({book.reviewCount} reviews)
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Latest Reviews Section */}
      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          Latest Reviews
        </Typography>
        <Grid container spacing={3}>
          {latestReviews.map((review) => (
            <Grid item xs={12} md={6} key={review._id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
                      {review.book.title}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    by {review.user.username}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {review.content}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={`/books/${review.book._id}`}
                    size="small"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;