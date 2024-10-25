import { Box, Typography, Button } from '@mui/material';
import ErrorImage from '../../assets/img/owl.jpg';

export default function ErrorPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding={3}
    >
      <img
        src={ErrorImage}
        alt="Error"
        style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
      />
      <Typography variant="h4" gutterBottom>
        Упс! Что-то пошло не так.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Мы не можем найти запрашиваемую страницу.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Вернуться на главную
      </Button>
    </Box>
  );
}
