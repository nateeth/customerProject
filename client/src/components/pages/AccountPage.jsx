import React, { useEffect, useState } from 'react';
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
    </div>
  );
}
