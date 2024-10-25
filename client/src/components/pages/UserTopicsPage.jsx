import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Divider, Button } from '@mui/material';
import axiosInstance from '../../axiosInstance';

export default function UserTopicsPage({ user }) {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axiosInstance.get(`/api/users/${user.id}/availableTopics`);
        setTopics(response.data);
      } catch (err) {
        console.error('Ошибка при загрузке тем', err);
      }
    };

    fetchTopics();
  }, [user]);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Доступные темы
      </Typography>
      <List>
        {topics.map((topic) => (
          <React.Fragment key={topic.id}>
            <ListItem>
              <ListItemText primary={topic.topicName} />
              <Button
                onClick={() => setSelectedTopicId(topic.id)}
                color="primary"
                variant="outlined"
              >
                Просмотреть карточки
              </Button>
            </ListItem>
            <Divider />
            {selectedTopicId === topic.id && (
              <List sx={{ pl: 4 }}>
                {topic.Cards.map((card) => (
                  <ListItem key={card.id}>
                    <ListItemText primary={`${card.value} - ${card.translation}`} />
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}
