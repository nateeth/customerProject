import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import axiosInstance from '../../axiosInstance';

export default function GroupPage({ user }) {
  const [groupName, setGroupName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [cardValue, setCardValue] = useState('');
  const [cardTranslation, setCardTranslation] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get(`/api/groups/${user.id}`);
        setGroups(response.data);
      } catch (err) {
        console.error('Error fetching groups', err);
      }
    };
    fetchGroups();
  }, [user]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/groups/groups/add', {
        groupName,
        userId: user.id,
      });
      setGroups([...groups, response.data]);
      setGroupName('');
      console.log(`Группа "${response.data.groupName}" создана!`);
    } catch (err) {
      console.error('Ошибка при создании группы', err);
    }
  };

  const handleCreateTopic = async (groupId) => {
    try {
      const response = await axiosInstance.post(`/api/groups/groups/${groupId}/topics`, {
        topicName,
        isPublic: true,
        langId: 1,
        authorId: user.id,
      });
      console.log(`Тема "${response.data.topicName}" создана!`);
      setTopicName('');
    } catch (err) {
      console.error('Ошибка при создании темы', err);
    }
  };

  const handleCreateCard = async () => {
    if (!selectedTopicId) return;
    try {
      const response = await axiosInstance.post(`/api/topics/${selectedTopicId}/cards`, {
        value: cardValue,
        translation: cardTranslation,
        authorId: user.id,
      });
      console.log(`Карточка создана в теме ${selectedTopicId}`);
      setCardValue('');
      setCardTranslation('');
    } catch (err) {
      console.error('Ошибка при создании карточки', err);
    }
  };

  return (
    <div>
      <h1>GroupPage</h1>

      <h2>Создать группу</h2>
      <Box component="form" onSubmit={handleCreateGroup} sx={{ mt: 3 }}>
        <TextField
          label="Group Name"
          variant="outlined"
          fullWidth
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Создать группу
        </Button>
      </Box>

      <h2>Группы пользователя</h2>
      {groups.map((group) => (
        <div key={group.id}>
          <Typography variant="h6">{group.groupName}</Typography>
          <TextField
            label="Topic Name"
            variant="outlined"
            fullWidth
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCreateTopic(group.id)}
          >
            Создать тему
          </Button>

          <List>
            {group.topics?.map((topic) => (
              <ListItem key={topic.id}>
                <ListItemText primary={topic.topicName} />
                <Button variant="contained" onClick={() => setSelectedTopicId(topic.id)}>
                  Выбрать тему
                </Button>
              </ListItem>
            ))}
          </List>

          <Divider />

          <Typography variant="subtitle1">Создать карточку в выбранной теме</Typography>
          <TextField
            label="Card Value"
            variant="outlined"
            fullWidth
            value={cardValue}
            onChange={(e) => setCardValue(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Card Translation"
            variant="outlined"
            fullWidth
            value={cardTranslation}
            onChange={(e) => setCardTranslation(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateCard}
            disabled={!selectedTopicId}
          >
            Создать карточку
          </Button>

          <Divider />
        </div>
      ))}
    </div>
  );
}
