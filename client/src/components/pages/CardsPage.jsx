import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import axiosInstance from '../../axiosInstance';
import { useParams, useLocation } from 'react-router-dom';

const CardsPage = () => {
  const { topicId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedLanguage = searchParams.get('language');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learnedCards, setLearnedCards] = useState(new Set());
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axiosInstance.get(`/api/cards?topicId=${topicId}&language=${selectedLanguage}`);
        setCardData(response.data);
      } catch (error) {
        console.error('Ошибка загрузки карточек:', error);
        setError('Не удалось загрузить карточки. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [topicId, selectedLanguage]);

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

  const handleLearned = () => {
    setLearnedCards((prev) => new Set(prev).add(cardData[currentIndex].id));
    handleNext();
  };

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h6" color="error">{error}</Typography>
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

  const { word, translation } = cardData[currentIndex];
  const isLearned = learnedCards.has(cardData[currentIndex].id);

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