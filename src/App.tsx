
import './App.css'
import AppRoutes from './routes/Routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  

  return (
    <>
    
       <RouterProvider router={AppRoutes}></RouterProvider>
    
    </>
  )
}

export default App
