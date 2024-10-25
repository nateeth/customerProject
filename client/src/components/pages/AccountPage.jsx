import React from 'react';
import axiosInstance from '../../axiosInstance';
import CreateCardsForm from '../ui/CreateCardsForm';
import { Box, Container, Typography } from '@mui/material';

export default function AccountPage({user}) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box component="header">
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Аккаунт
        </Typography>
      </Box>
      <Box component="main" flexGrow={1}>
        <Container>
          <CreateCardsForm authorId={user?.id}/>
        </Container>
      </Box>
    </Box>
  );
}
