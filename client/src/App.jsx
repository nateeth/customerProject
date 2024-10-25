import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage';
import LoginPage from './components/pages/LoginPage';
import TopicsPage from './components/pages/TopicsPage';
import CardsPage from './components/pages/CardsPage';
import AccountPage from './components/pages/AccountPage';
import ErrorPage from './components/pages/ErrorPage';
import axiosInstance from './axiosInstance';
import { setAccessToken } from './axiosInstance';

function App() {
  const [user, setUser] = useState(0);

  const logoutHandler = async () => {
    await axiosInstance.get('/auth/logout');
    setUser(null);
    setAccessToken('');
  };

  useEffect(() => {
    axiosInstance('/api/tokens/refresh')
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => setUser(null));
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/signup',
          element: <SignupPage setUser={setUser} />,
        },
        {
          path: '/login',
          element: <LoginPage setUser={setUser} />,
        },
        {
          path: '/topics',
          element: <TopicsPage user={user} setUser={setUser} />,
        },
        {
          path: '/cards/:topicId',
          element: <CardsPage />,
        },
        {
          path: '/account/:userId',
          element: <AccountPage user={user} />,
        },
        {
          path: '*',
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
