import { AppBar, IconButton, Toolbar, Typography, Button, Box } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Иконка аккаунта
import { useNavigate } from 'react-router-dom';

export default function NavigationBar({ user, logoutHandler }) {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate('/');
  };

  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleNavigateToAccount = () => {
    navigate(`/account/${user.id}`);
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          onClick={handleNavigateToHome}
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <FolderCopyIcon />
        </IconButton>
        <Typography
          onClick={handleNavigateToHome}
          variant="h6"
          color="inherit"
          component="div"
          sx={{ cursor: 'pointer', flexGrow: 1 }}
        >
          Funny Cards
        </Typography>
        {user?.id ? (
          <>
            <Typography variant="subtitle1" color="inherit" sx={{ whiteSpace: 'nowrap' }}>
              Привет, {user.userName}
            </Typography>
            {/* Кнопка Аккаунт со стилями и иконкой */}
            <Button
              variant="contained" // Завернуть в "contained" для четкой кнопки
              color="secondary"
              onClick={handleNavigateToAccount}
              startIcon={<AccountCircleIcon />} // Иконка слева от текста
              sx={{ ml: 2, textTransform: 'none' }} // Нотация textTransform для отмены заглавных
            >
              Аккаунт
            </Button>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <Button color="inherit" onClick={handleNavigateToSignup}>
              Регистрация
            </Button>
            <Button color="inherit" onClick={handleNavigateToLogin}>
              Логин
            </Button>
          </Box>
        )}
        {user?.id && logoutHandler && (
          <IconButton onClick={logoutHandler} color="inherit" sx={{ ml: 2 }}>
            Выйти
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
