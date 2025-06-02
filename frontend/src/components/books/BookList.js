import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  TextField,
  MenuItem,
  Box,
  Container,
  Typography
} from '@mui/material';
import { fetchBooks } from '../../store/slices/booksSlice';
import BookCard from './BookCard';
import Loading from '../common/Loading';
import Error from '../common/Error';
import Pagination from '../common/Pagination';

const genres = [
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

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, totalPages, currentPage } = useSelector(
    (state) => state.books
  );
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch(fetchBooks({ page: currentPage, search: debouncedSearch, genre }));
  }, [dispatch, currentPage, debouncedSearch, genre]);

  const handlePageChange = (page) => {
    dispatch(fetchBooks({ page, search: debouncedSearch, genre }));
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Books
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search books"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or author..."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Filter by genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <MenuItem value="">All Genres</MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {books.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          No books found
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item key={book._id} xs={12} sm={6} md={4} lg={3}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};

export default BookList;