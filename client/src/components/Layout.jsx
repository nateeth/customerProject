import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavigatiobBar';
import { Box, Container } from '@mui/material';
import FooterComponent from './ui/FooterComponent';

export default function Layout({ user, logoutHandler }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box component="header">
        <NavBar user={user} logoutHandler={logoutHandler} />
      </Box>
      <Box component="main" flexGrow={1}>
        <Container>
          <Outlet />
        </Container>
      </Box>
      <Box component="footer">
        <FooterComponent />
      </Box>
    </Box>
  );
}
