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
//     <div>
//       <h1>Страница аккаунта: {user?.userName}</h1>
//       <h2>Прогресс</h2>

//       {loading && <p>Загрузка данных...</p>}
//       {error && <p>Ошибка: {error}</p>}

//       {!error &&
//         progressData.map((progress) => {
//           const studiedPercentage = (progress.cardsStudied / progress.totalCards) * 100;
//           const openedPercentage = (progress.cardsOpened / progress.totalCards) * 100;

//           return (
//             <Box key={progress.topicName} mb={4}>
//               <Typography variant="h6">{progress.topicName}</Typography>

//               <Typography variant="body2">Карточек изучено</Typography>
//               <LinearProgress
//                 variant="determinate"
//                 value={studiedPercentage}
//                 sx={{ mb: 2 }}
//               />

//               <Typography variant="body2">Карточек открыто</Typography>
//               <LinearProgress variant="determinate" value={openedPercentage} />
//             </Box>
//           );
//         })}
//     </div>
//   );
// }

    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <motion.div
        onClick={handleFlip}
        style={{
          width: '300px',
          height: '200px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          perspective: '1000px',
          position: 'relative',
        }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          style={{
            position: 'absolute',
            backfaceVisibility: 'hidden',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#000',
            fontWeight: 'bold',
          }}
        >
          <Typography variant="h4">{flipped ? translation : word}</Typography>
        </Box>
        <Box
          style={{
            position: 'absolute',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E0FFFF',
          }}
        >
          <Typography variant="h4">{flipped ? word : translation}</Typography>
        </Box>
      </motion.div>

      <Box mt={2}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{ mr: 1 }}
        >
          Назад
        </Button>
        <Button
          variant="outlined"
          onClick={handleNext}
          disabled={currentIndex === cardData.length - 1}
        >
          Вперед
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLearned}
          sx={{ ml: 1 }}
        >
          Изучено
        </Button>
      </Box>
    </Box>
  );
};

export default CardsPage;
