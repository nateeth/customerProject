import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import axiosInstance from '../../axiosInstance';
import { useParams, useLocation } from 'react-router-dom';

const CardsPage = ({ userId }) => {
  const { topicId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedLanguage = searchParams.get('language') || '';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learnedCards, setLearnedCards] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/topics/${topicId}/${userId}`, {
          params: { language: selectedLanguage },
        });
        console.log('Полученные карточки:', response.data);
        setCardData(response.data);
      } catch (error) {
        console.error('Ошибка загрузки карточек:', error);
        setError('Не удалось загрузить карточки. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [topicId, selectedLanguage, userId]);

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex < cardData.length - 1 ? prevIndex + 1 : prevIndex,
    );
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <CircularProgress />
        <Typography variant="h6">Загрузка карточек...</Typography>
      </Box>
    );
  }

  if (cardData.length === 0) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h6">Нет карточек для отображения.</Typography>
      </Box>
    );
  }

  const { value, translation } = cardData[currentIndex];

  return (
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
          transformStyle: 'preserve-3d',  
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
          <Typography variant="h4">{value}</Typography>
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
          }}
        >
          <Typography variant="h4">{translation}</Typography>
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
      </Box>
    </Box>
  );
};

export default CardsPage;
