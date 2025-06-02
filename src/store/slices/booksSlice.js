import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { booksAPI } from '../../services/api';

const initialState = {
  books: [],
  book: null,
  loading: false,
  error: null,
  totalPages: 1
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await booksAPI.getBooks(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch books');
    }
  }
);

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await booksAPI.getBookById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch book');
    }
  }
);

export const createBook = createAsyncThunk(
  'books/createBook',
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await booksAPI.createBook(bookData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create book');
    }
  }
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, bookData }, { rejectWithValue }) => {
    try {
      const response = await booksAPI.updateBook(id, bookData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update book');
    }
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id, { rejectWithValue }) => {
    try {
      await booksAPI.deleteBook(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete book');
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearBook: (state) => {
      state.book = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Book by ID
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Book
      .addCase(createBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.unshift(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Book
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.books.findIndex(book => book._id === action.payload._id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        state.book = action.payload;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Book
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter(book => book._id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearBook } = booksSlice.actions;
export default booksSlice.reducer;