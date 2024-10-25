import React, { useEffect, useState } from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';
import axiosInstance from '../../axiosInstance';

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
        setError(null); // Сброс ошибки при успешной загрузке
      } catch (err) {
        setError(err.response.data.message || err.message);
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

      {!error &&
        progressData.map((progress) => {
          const studiedPercentage = (progress.cardsStudied / progress.totalCards) * 100;
          const openedPercentage = (progress.cardsOpened / progress.totalCards) * 100;

          return (
            <Box key={progress.topicName} mb={4}>
              <Typography variant="h6">{progress.topicName}</Typography>

              <Typography variant="body2">Карточек изучено</Typography>
              <LinearProgress
                variant="determinate"
                value={studiedPercentage}
                sx={{ mb: 2 }}
              />

              <Typography variant="body2">Карточек открыто</Typography>
              <LinearProgress variant="determinate" value={openedPercentage} />
            </Box>
          );
        })}
    </div>
  );
}
