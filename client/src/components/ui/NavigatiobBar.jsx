import { AppBar, IconButton, Toolbar, Typography, Button, Box } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description'; // Иконка для тем
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

  const handleNavigateToGroups = () => {
    navigate('/groups');
  };

  const handleNavigateToUserTopics = () => {
    navigate('/user/topics'); // Функция для навигации на страницу тем
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
            <Button
              color="inherit"
              onClick={handleNavigateToGroups}
              startIcon={<GroupIcon />}
              sx={{ ml: 2, textTransform: 'none' }}
            >
              Группы
            </Button>
            {/* Кнопка для перехода на страницу тем */}
            <Button
              color="inherit"
              onClick={handleNavigateToUserTopics}
              startIcon={<DescriptionIcon />}
              sx={{ ml: 2, textTransform: 'none' }}
            >
              Темы
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNavigateToAccount}
              startIcon={<AccountCircleIcon />}
              sx={{ ml: 2, textTransform: 'none' }}
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
