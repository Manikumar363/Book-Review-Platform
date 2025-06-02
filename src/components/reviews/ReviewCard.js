import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Rating,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/slices/reviewsSlice';

const ReviewCard = ({ review }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(deleteReview(review._id));
    handleMenuClose();
  };

  const isOwner = currentUser?._id === review.user._id;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={review.user.profilePicture}
              alt={review.user.username}
              sx={{ mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1" component="div">
                {review.user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          {(isOwner || isAdmin) && (
            <>
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {isOwner && (
                  <MenuItem onClick={handleMenuClose}>
                    Edit
                  </MenuItem>
                )}
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                  Delete
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={review.rating} readOnly size="small" />
          <Typography variant="h6" sx={{ ml: 1 }}>
            {review.title}
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary">
          {review.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;