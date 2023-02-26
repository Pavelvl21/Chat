import { Provider } from 'react-redux';
import App from './components/App.jsx';

import store, { actions } from './slices/index.js';
import contexts from './contexts/index.js';

const init = async (socket) => {
  const { ApiContext } = contexts;
  const Api = {
    sendMessage: (...args) => socket.emit('newMessage', ...args),
  };
  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage({ message: payload }));
  });
  return (
    <Provider store={store}>
      <ApiContext.Provider value={Api}>
        <App />
      </ApiContext.Provider>
    </Provider>
  );
};

export default init;
