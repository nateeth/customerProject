import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage';
import LoginPage from './components/pages/LoginPage';
import TopicsPage from './components/pages/TopicsPage';
import CardsPage from './components/pages/CardsPage';
import AccountPage from './components/pages/AccountPage';
import ErrorPage from './components/pages/ErrorPage';

function App() {
  const [user, setUser] = useState(0);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} />,
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
          element: <TopicsPage user={user} />,
        },
        {
          // path: '/topics/:topicId',
           //   path: '/cards/:topicId?language', или так?
           path: 'cardsTest',
           element: <CardsPage />,
        },
        {
          path: '/account',
          element: <AccountPage />,
        },
        {
          path: '/error',
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
