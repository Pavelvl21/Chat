import React, { useState, useMemo } from 'react';

import '../assets/app.scss';
import Context from '../contexts/index.js';

const { AuthContext } = Context;
const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return (userData?.token ? { Authorization: `Bearer ${userData.token}` } : {});
  };
  const auth = useMemo(() => ({ logIn, getAuthHeader, user }), [user]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
