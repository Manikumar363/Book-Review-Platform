import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert
} from '@mui/material';
import { fetchBooks } from '../store/slices/booksSlice';
import BookCard from '../components/books/BookCard';

const Books = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { books, loading, error, totalPages } = useSelector((state) => state.books);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    genre: searchParams.get('genre') || '',
    sortBy: searchParams.get('sortBy') || 'newest',
    page: parseInt(searchParams.get('page')) || 1
  });

  useEffect(() => {
    dispatch(fetchBooks(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1
    }));
    setSearchParams(prev => {
      prev.set(name, value);
      prev.set('page', '1');
      return prev;
    });
  };

  const handlePageChange = (event, value) => {
    setFilters(prev => ({
      ...prev,
      page: value
    }));
    setSearchParams(prev => {
      prev.set('page', value.toString());
      return prev;
    });
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'title', label: 'Title A-Z' }
  ];

  const genreOptions = [
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Science Fiction',
    'Fantasy',
    'Romance',
    'Biography',
    'History',
    'Self-Help',
    'Business'
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Books
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Search"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by title or author"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            select
            label="Genre"
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genreOptions.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            select
            label="Sort By"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Books Grid */}
      {books.length === 0 ? (
        <Alert severity="info" sx={{ my: 2 }}>
          No books found matching your criteria.
        </Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book._id}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={filters.page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Books; 