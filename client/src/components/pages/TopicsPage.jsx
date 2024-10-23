import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TopicsPage({ user }) {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    axios('/api/topics').then(({ data }) => setTopics(data));
  }, []);

  return (
    <div>
      <h1>Темы</h1>
      <ul>
        {topics?.map((topic) => (
          <li key={topic.id}>
            <Link to={`/topic/${topic.id}`}>{topic.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
