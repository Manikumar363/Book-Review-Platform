import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'About',
      links: [
        { text: 'About Us', path: '/about' },
        { text: 'Contact', path: '/contact' },
        { text: 'Careers', path: '/careers' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', path: '/blog' },
        { text: 'Help Center', path: '/help' },
        { text: 'Terms of Service', path: '/terms' },
        { text: 'Privacy Policy', path: '/privacy' }
      ]
    },
    {
      title: 'Community',
      links: [
        { text: 'Forums', path: '/forums' },
        { text: 'Events', path: '/events' },
        { text: 'Book Clubs', path: '/book-clubs' }
      ]
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              BookReview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your trusted platform for book reviews and recommendations.
              Join our community of readers and share your thoughts on your favorite books.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {footerLinks.map((section) => (
            <Grid item xs={12} sm={6} md={2} key={section.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {section.title}
              </Typography>
              {section.links.map((link) => (
                <Link
                  key={link.text}
                  component={RouterLink}
                  to={link.path}
                  color="text.secondary"
                  display="block"
                  sx={{ mb: 1 }}
                >
                  {link.text}
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} BookReview. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;