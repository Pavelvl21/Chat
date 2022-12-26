import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
// import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <div>There will authorization on this page</div>,
  },
]);

const App = () => {
  return (
    <div className="d-flex flex-column vh-100">
<RouterProvider router={router} />
    </div>
    
  );
};

export default App;
