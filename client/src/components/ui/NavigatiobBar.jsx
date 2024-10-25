import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { useNavigate } from 'react-router-dom';

export default function NavigatiobBar() {
  const navigate = useNavigate();
  const handleNavigateToHome = () => {
    navigate('/');
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
          sx={{ cursor: 'pointer' }}
        >
          Funny Cards
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
