;
import { createBrowserRouter} from 'react-router-dom';
import HomePage from '../pages/home/Home';

//...import other pages

const AppRoutes = createBrowserRouter([
  {path: '/', element: <HomePage />}
])


export default AppRoutes;
