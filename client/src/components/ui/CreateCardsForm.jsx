import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateCardsForm = ({ authorId }) => {
  const [topicName, setTopicName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [cards, setCards] = useState([{ value: '', translation: '' }]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('/api/languages');
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error('Ошибка при загрузке языков:', error);
      }
    };

    fetchLanguages();
  }, []);

  const handleAddCard = () => {
    setCards([...cards, { value: '', translation: '' }]);
  };

  const handleCardChange = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const handleDeleteCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const topicData = {
      topicName,
      isPublic,
      langId: selectedLanguage,
      authorId,
    };

    try {
      const topicResponse = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(topicData),
      });

      const createdTopic = await topicResponse.json();

      const cardPromises = cards.map((card) => {
        const cardData = {
          value: card.value,
          translation: card.translation,
          topicId: createdTopic.id,
          authorId,
        };
        return fetch('/api/cards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cardData),
        });
      });

      await Promise.all(cardPromises);

      setTopicName('');
      setIsPublic(false);
      setSelectedLanguage('');
      setCards([{ value: '', translation: '' }]);

      console.log('Тема и карточки успешно созданы!');
    } catch (error) {
      console.error('Ошибка при создании темы или карточек:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Создать тему и карточки
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Название темы"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Выберите язык</InputLabel>
          <Select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            required
          >
            {languages.map((language) => (
              <MenuItem key={language.id} value={language.id}>
                {language.langName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          }
          label="Публичная группа"
        />
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Карточки
        </Typography>
        <List>
          {cards.map((card, index) => (
            <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Слово"
                value={card.value}
                onChange={(e) => handleCardChange(index, 'value', e.target.value)}
                required
                sx={{ mr: 2 , ml: -2 }}
              />
              <TextField
                label="Перевод"
                value={card.translation}
                onChange={(e) => handleCardChange(index, 'translation', e.target.value)}
                required
                sx={{ mr: 2 }}
              />
              <IconButton onClick={() => handleDeleteCard(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddCard}
          startIcon={<AddIcon />}
          sx={{ mb: 2 }}
        >
          Добавить карточку
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{ mb: 2, ml:5}}>
          Создать тему
        </Button>
      </Box>
    </Container>
  );
};

export default CreateCardsForm;