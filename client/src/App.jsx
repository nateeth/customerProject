import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage';
import LoginPage from './components/pages/LoginPage';
import TopicsPage from './components/pages/TopicsPage';
import CardPage from './components/pages/CardsPage';
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
          element: <SignupPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/topics',
          element: <TopicsPage />,
        },
        {
          path: '/topic/:cards',
          element: <CardPage />,
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
