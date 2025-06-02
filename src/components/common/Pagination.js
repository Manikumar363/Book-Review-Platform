import React from 'react';
import { Box, Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
        mb: 2
      }}
    >
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        color="primary"
        showFirstButton
        showLastButton
        size="large"
      />
    </Box>
  );
};

export default Pagination;