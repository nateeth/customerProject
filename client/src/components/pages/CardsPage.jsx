import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CardsPage({ user }) {
  const [cards, setCards] = useState([]);

  const { topicId } = useParams();

  useEffect(() => {
    if (topicId) { // Проверка на случай, если topicId не определён
      axios.get(`/api/topics/${topicId}`).then(({ data }) => setCards(data));
    }
  }, []);

  const openCard = () => {
    axios.put(`/api/progress/${user.id}/${card.id}`); // Меняю в БД статус карты на открытую
  }

  return (
    <div>
      <h1>Карточки по теме: </h1>
      <ul>
        {cards?.map((card) => (
          <li key={card.id}>
            {card.value} <br></br>
            {card.translation} <br></br>
            {card.topicid} <br></br>
            {card.isStudied} <br></br>
            {card.isOpened}
            <button onClick={openCard}>Открыть карту</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
