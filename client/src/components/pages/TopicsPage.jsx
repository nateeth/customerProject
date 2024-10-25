import { useEffect, useState } from 'react';
import { Box, Button, Typography, Container, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

const TopicPage = ({ user }) => {
  const [topics, setTopics] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopicsAndLanguages = async () => {
      try {
        const topicsResponse = await axiosInstance.get('/api/topics');
        const languagesResponse = await axiosInstance.get('/api/languages');
        setTopics(topicsResponse.data);
        setLanguages(languagesResponse.data);
        console.log('Языки:', languagesResponse.data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setError('Не удалось загрузить данные. Попробуйте позже.');
      }
    };
    fetchTopicsAndLanguages();
  }, []);

  const handleTopicClick = (topicId) => {
    console.log(`ПЕРЕХОДИМ НА ТОПИК С АЙДИ: ${topicId} ЯЗЫК: ${selectedLanguage}`);
    const url = selectedLanguage
      ? `/cards/${topicId}?language=${selectedLanguage}`
      : `/cards/${topicId}`;
    navigate(url);
  };

  const userId = user?.id;

  const filteredTopics = topics.filter((topic) =>
    userId ? topic.authorId === userId : true,
  );

  if (filteredTopics.length === 0) {
    return (
      <Container>
        <Typography variant="h6">У вас нет доступных тем для отображения.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ pb: 4 }}>
      <Typography variant="h4" gutterBottom mt={4}>
        Выберите язык и тему для тренировки
      </Typography>

      <Box mb={4}>
        {languages.map((language) => (
          <Button
            key={language.id}
            variant={selectedLanguage === language.id ? 'contained' : 'outlined'}
            onClick={() => {
              console.log(`Выбранный язык: ${language.id}`);
              setSelectedLanguage(language.id);
            }}
            sx={{ mr: 1 }}
          >
            {language.langName}
          </Button>
        ))}
        <Button
          variant={selectedLanguage === '' ? 'contained' : 'outlined'}
          onClick={() => setSelectedLanguage('')}
          sx={{ ml: 3 }}
        >
          Все
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2}>
        {filteredTopics
          .filter((topic) => selectedLanguage === '' || topic.langId === selectedLanguage)
          .map((topic) => (
            <Box
              key={topic.id}
              sx={{
                flex: '0 0 auto',
                width: '300px',
                p: 2,
                border: '1px solid',
                borderRadius: 2,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
              onClick={() => handleTopicClick(topic.id)}
            >
              <Typography variant="h6">{topic.topicName}</Typography>
              <Typography variant="body2">Количество слов: {topic.wordCount}</Typography>
              <Typography variant="body2">Автор: {topic.User?.userName}</Typography>
            </Box>
          ))}
      </Box>

      <Snackbar
        open={!!error}
        onClose={() => setError(null)}
        message={error}
        autoHideDuration={6000}
      />
    </Container>
  );
};

export default TopicPage;
