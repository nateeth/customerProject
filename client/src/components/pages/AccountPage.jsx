import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Box, Container, Typography } from '@mui/material';
import CreateCardsForm from '../ui/CreateCardsForm';

export default function AccountPage({ user }) {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchProgressData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/progress/${user.id}`);
        setProgressData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [user]);

  return (
    <div>
      <h1>Страница аккаунта: {user?.userName}</h1>
      <h2>Прогресс</h2>

      {loading && <p>Загрузка данных...</p>}
      {error && <p>Ошибка: {error}</p>}

      {progressData.map((progress) => (
        <div key={progress.topicName}> 
          <h3>{progress.topicName}</h3>
          <p>Всего карточек: {progress.totalCards}</p>
          <p>Карточек изучено: {progress.cardsStudied}</p>
          <p>Карточек открыто: {progress.cardsOpened}</p>
        </div>
      ))}
       
        <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box component="header">
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Аккаунт
        </Typography>
      </Box>
      <Box component="main" flexGrow={1}>
        <Container>
          <CreateCardsForm authorId={user?.id}/>
        </Container>
      </Box>
    </Box>
    </div>
  );
}
