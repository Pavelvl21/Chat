import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';
import Navbar from './Navbar';
import AuthProvider from './AuthProvider.jsx';

import '../assets/app.scss';

import useHook from '../hooks/index.js';

const PrivateOutlet = () => {
  const { useAuth } = useHook;
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="" element={<ChatPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
