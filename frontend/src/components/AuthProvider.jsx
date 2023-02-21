import React, { useState, useMemo } from 'react';

import '../assets/app.scss';
import AuthContext from '../contexts/index.jsx';

const currentUser = JSON.parse(localStorage.getItem('user'));
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const getAuthHeader = () => (currentUser?.token ? { Authorization: `Bearer ${currentUser.token}` } : {});
  const auth = useMemo(() => ({ logIn, getAuthHeader, user }), [user]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
