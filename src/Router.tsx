import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/app/App';
import Game from './components/game/Game';

export const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/game',
    element: <Game />,
  },
];

const router = createBrowserRouter(routes);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
