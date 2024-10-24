import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import axiosInstance from '../../axiosInstance'


const cardData = [
  { id: 1, word: 'Apple', translation: 'Яблоко' },
  { id: 2, word: 'Banana', translation: 'Банан' },
  { id: 3, word: 'Cherry', translation: 'Вишня' },
];

const CardsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learnedCards, setLearnedCards] = useState(new Set());

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

  const { word, translation } = cardData[currentIndex];

  const isLearned = learnedCards.has(cardData[currentIndex].id);

  if (isLearned) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Button onClick={handleNext} variant="outlined">
          Вперед
        </Button>
      </Box>
    );
  }

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
          {/* <button onClick={handleFlip}>
            Click me
          </button> */}
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

// export default function CardsPage({ user }) {
//   const [cards, setCards] = useState([]);

//   const { topicId } = useParams();

//   useEffect(() => {
//     if (topicId) { // Проверка на случай, если topicId не определён
//       axios.get(`/api/topics/${topicId}`).then(({ data }) => setCards(data));
//     }
//   }, []);

//   const openCard = () => {
//     axios.put(`/api/progress/${user.id}/${card.id}`); // Меняю в БД статус карты на открытую
//   }

//   return (
//     <div>
//       <h1>Карточки по теме: </h1>
//       <ul>
//         {cards?.map((card) => (
//           <li key={card.id}>
//             {card.value} <br></br>
//             {card.translation} <br></br>
//             {card.topicid} <br></br>
//             {card.isStudied} <br></br>
//             {card.isOpened}
//             <button onClick={openCard}>Открыть карту</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
