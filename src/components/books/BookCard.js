import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  Chip,
  CardActionArea
} from '@mui/material';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 3
        }
      }}
    >
      <CardActionArea onClick={() => navigate(`/books/${book._id}`)}>
        <CardMedia
          component="img"
          height="200"
          image={book.coverImage || 'https://via.placeholder.com/200x300?text=No+Cover'}
          alt={book.title}
          sx={{ objectFit: 'contain', bgcolor: 'grey.100' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            by {book.author}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating
              value={book.averageRating}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({book.totalReviews})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {book.genre?.slice(0, 3).map((genre) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;