import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Avatar,
  Button,
  Tab,
  Tabs,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Edit as EditIcon,
  Book as BookIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { fetchUserReviews } from '../store/slices/reviewsSlice';
import ReviewCard from '../components/reviews/ReviewCard';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserReviews(user._id));
    }
  }, [dispatch, user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!user) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ my: 2 }}>
          Please log in to view your profile.
        </Alert>
      </Container>
    );
  }

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
      <Grid container spacing={4}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  src={user.profilePicture}
                  alt={user.username}
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="h4" component="h1" gutterBottom>
                  {user.username}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => {/* Handle edit profile */}}
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Profile Content */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab
                  icon={<BookIcon />}
                  label="My Reviews"
                  iconPosition="start"
                />
                <Tab
                  icon={<StarIcon />}
                  label="Reading List"
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            {tabValue === 0 && (
              <Box>
                {reviews.length === 0 ? (
                  <Typography variant="body1" color="text.secondary" align="center">
                    You haven't written any reviews yet.
                  </Typography>
                ) : (
                  reviews.map((review) => (
                    <React.Fragment key={review._id}>
                      <ReviewCard review={review} />
                      <Divider sx={{ my: 2 }} />
                    </React.Fragment>
                  ))
                )}
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="body1" color="text.secondary" align="center">
                  Your reading list is empty.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;