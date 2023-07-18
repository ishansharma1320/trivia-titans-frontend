import { createBrowserRouter } from 'react-router-dom';
import  AuthLayout  from './layouts/AuthLayout/AuthLayout';
import HomeLayout from './layouts/HomeLayout/HomeLayout';
// import AuthPage from './pages/AuthPage/AuthPage';
import LoginForm from './components/LoginForm/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import ProfilePage from './components/ProfilePage/ProfilePage';
const router = createBrowserRouter([
    {path: '/auth', element: <AuthLayout />,
    children: [
        {path: 'login', element: <LoginForm />},
        {path: 'forgotPassword', element: <ForgotPasswordForm />},
        {path: 'register', element: <RegisterForm />}
    ]},
    {path: '/home', element: <HomeLayout />,
    children: [
        {path: 'profile', element: <ProfilePage />},
        // {path: '/forgotPassword', element: <ForgotPasswordForm />},
        // {path: '/register', element: <RegisterForm />}
    ]}

  ])

export default router;
