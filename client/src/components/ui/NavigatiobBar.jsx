import { AppBar, IconButton, Toolbar, Typography, Button, Box } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
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
          <Typography
            variant="subtitle1"
            color="inherit"
            sx={{ ml: 'auto', whiteSpace: 'nowrap' }}
          >
            Привет, {user.userName}
          </Typography>
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
          <Button onClick={logoutHandler} color="inherit" sx={{ ml: 2 }}>
            Выйти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
