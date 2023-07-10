import { createBrowserRouter } from 'react-router-dom';
import  AuthLayout  from './layouts/AuthLayout';
import HomePage from './pages/home/Home';

const router = createBrowserRouter([
    {path: '/', element: <AuthLayout />,
    children: [
        {path: '/login', element: <HomePage />}
    ]}
  ])

export default router;
