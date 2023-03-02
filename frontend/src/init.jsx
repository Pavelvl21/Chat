import { Provider } from 'react-redux';
import App from './components/App.jsx';

import store, { actions } from './slices/index.js';
import contexts from './contexts/index.js';

const init = async (socket) => {
  const { ApiContext } = contexts;

  const api = {
    sendMessage: (...args) => socket.emit('newMessage', ...args),
    createChannel: (...args) => new Promise((resolve, reject) => {
      socket.timeout(3000).emit('newChannel', ...args, (error, response) => {
        const { data } = response;
        if (error) {
          console.error(error);
          reject();
        }
        resolve(data);
      });
    }),
    removeChannel: (...args) => socket.emit('removeChannel', ...args),
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage({ message: payload }));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel({ channel: payload }));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeChannel({ channelId: payload.id }));
  });
  return (
    <Provider store={store}>
      <ApiContext.Provider value={api}>
        <App />
      </ApiContext.Provider>
    </Provider>
  );
};

export default init;
