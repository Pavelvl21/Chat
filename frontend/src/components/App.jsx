import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home page</div>,
    errorElement: <div>Error page</div>,
  },
  {
    path: '/login',
    element: <div>Login page</div>,
  }
]);

const App = () => {
  return(
    <RouterProvider router={router} />
  );
}

export default App;
