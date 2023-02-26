import { useContext } from 'react';

import Context from '../contexts/index.js';

const { AuthContext, ApiContext } = Context;

const useAuth = () => useContext(AuthContext);
const useApi = () => useContext(ApiContext);

export default { useApi, useAuth };
