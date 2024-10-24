import { Box, Container, Typography } from '@mui/material';

export default function FooterComponent() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Сделано с ❤️ командой Наташи, Даши, Лизы и Жени
          </Typography>
        </Container>
      </Box>
    </>
  );
}
