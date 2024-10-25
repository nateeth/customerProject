import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  FormHelperText,
} from '@mui/material';
import axiosInstance from '../../axiosInstance';
import { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
// validationt password

export default function SignupPage({ setUser }) {
  const [formData, setFormData] = useState({
    // управляемая форма
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  function validPassword(password) {
    // проверка пароля
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const special = '!@#$%^&*()-_+=<>,./;:[]{}?|';
    const digits = '0123456789';
    return (
      password &&
      password.length >= 12 &&
      password.split('').some((char) => lowercase.includes(char)) &&
      password.split('').some((char) => uppercase.includes(char)) &&
      password.split('').some((char) => special.includes(char)) &&
      password.split('').some((char) => digits.includes(char)) &&
      password[0] !== 'a' &&
      password[0] !== 1
    );
  }

  const [passwordError, setPasswordError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'confirmPassword') {
      setPasswordError(e.target.value !== formData.password);
    }
    if (e.target.name === 'password') {
      setPasswordError(!validPassword(e.target.value));
      setPasswordValid(validPassword(e.target.value));
    }
  };

  const registrationHandler = async (event) => {
    event.preventDefault();
    if (
      formData.password !== formData.confirmPassword ||
      !validPassword(formData.password)
    ) {
      setPasswordError(true);
      setPasswordValid(false);
      return;
    }

    try {
      const res = await axiosInstance.post('/api/auth/signup', formData);
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      navigate('/topics');
    } catch (error) {
      alert('Произошла ошибка: ' + error?.response?.data?.message);
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
          Регистрация
        </Typography>
        <Box component="form" onSubmit={registrationHandler} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Введите логин"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
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
            error={!passwordValid}
            helperText={!passwordValid ? 'Пароль не соответствует требованиям' : ''}
            required
          />
          <TextField
            fullWidth
            label="Повторите пароль"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
            error={passwordError}
          />
          {passwordError && <FormHelperText error>Пароли не совпадают</FormHelperText>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
