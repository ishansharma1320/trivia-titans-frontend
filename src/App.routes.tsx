import { Navigate, createBrowserRouter } from 'react-router-dom';
import  AuthLayout  from './layouts/AuthLayout/AuthLayout';
import HomeLayout from './layouts/HomeLayout/HomeLayout';
// import AuthPage from './pages/AuthPage/AuthPage';
import LoginForm from './components/LoginForm/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import ProfilePage from './components/ProfilePage/ProfilePage';
import AdminPanel from './components/AdminPanel/AdminPanel';
import GamePanel from './components/AdminPanel/GamePanel/GamePanel';
import QuestionsPanel from './components/AdminPanel/QuestionsPanel/QuestionsPanel';
import QuestionsTable from './components/AdminPanel/QuestionsPanel/QuestionsTable';
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
        {path: 'admin', element: <AdminPanel />, children:[
            { path: '', element: <Navigate to="games" /> }, 
            {path: 'games', element: <GamePanel />},
            { path: 'games/view', element: <QuestionsPanel /> },
            {path: 'questions', element: <QuestionsPanel />}
        ]},
        // {path: '/forgotPassword', element: <ForgotPasswordForm />},
        // {path: '/register', element: <RegisterForm />}
    ]}

  ])

export default router;
