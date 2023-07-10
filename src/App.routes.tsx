import { createBrowserRouter } from 'react-router-dom';
import  AuthLayout  from './layouts/AuthLayout/AuthLayout';
// import AuthPage from './pages/AuthPage/AuthPage';
import LoginForm from './components/LoginForm/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm';

const router = createBrowserRouter([
    {path: '/', element: <AuthLayout />,
    children: [
        {path: '/login', element: <LoginForm />},
        {path: '/forgotPassword', element: <ForgotPasswordForm />}
    ]}
  ])

export default router;
