import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

export default function LoginPage({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      setUser(res.data.user);
    } catch (error) {
      if (error.response) {
        console.error('Ошибка ответа сервера:', error.response.data);
        alert(
          'Ошибка при входе: ' +
            (error.response.data.message || 'Неизвестная ошибка сервера.'),
        );
      } else if (error.request) {
        console.error('Сервер не ответил:', error.request);
        alert('Сервер не отвечает. Пожалуйста, попробуйте позже.');
      } else {
        console.error('Ошибка при настройке запроса:', error.message);
        alert('Произошла ошибка: ' + error.message);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <Box component="form" onSubmit={loginHandler} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Введите email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Введите пароль"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
