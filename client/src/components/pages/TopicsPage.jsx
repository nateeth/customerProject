import { useEffect, useState } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance'
import {setAccessToken} from '../../axiosInstance'

const TopicPage = ({user, setUser}) => {
  const [topics, setTopics] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axiosInstance('/tokens/refresh')
  //     .then(({ data }) => {
  //       setTimeout(() => {
  //         setUser({ status: 'logged', data: data.user });
  //       }, 1000);
  //       setAccessToken(data.accessToken);
  //     })
  //     .catch(() => {
  //       setUser({ status: 'guest', data: null });
  //       setAccessToken('');
  //     });
  // }, []);

  useEffect(() => {
    const fetchTopicsAndLanguages = async () => {
      try {
        const topicsResponse = await axiosInstance.get('/api/topics');
        const languagesResponse = await axiosInstance.get('/api/languages');
        setTopics(topicsResponse.data);
        setLanguages(languagesResponse.data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };
    fetchTopicsAndLanguages();
  }, []);

  const handleTopicClick = (topicId) => {
    navigate(`/cards/${topicId}?language=${selectedLanguage}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={4}>
        Выберите язык и тему для тренировки
      </Typography>

      <Box mb={4}>
        {languages.map((language) => (
          <Button
            key={language.id}
            variant={selectedLanguage === language.id ? 'contained' : 'outlined'}
            onClick={() => setSelectedLanguage(language.id)}
            sx={{ mr: 1 }}
          >
            {language.langName}
          </Button>
        ))}
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2}>
        {topics
          .filter((topic) => topic.langId === selectedLanguage)
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
              <Typography variant="body2">Автор: {topic.User.userName}</Typography>
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default TopicPage;
