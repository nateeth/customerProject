import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Funny Cards
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Изучайте иностранные слова легко с помощью карточек!
        </Typography>

        <Box mt={4} width="100%" maxWidth="300px">
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
            Войти
          </Button>
        </Box>

        <Box mt={2} width="100%" maxWidth="300px">
          <Button variant="outlined" onClick={handleSignup} fullWidth>
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
