import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App.jsx';
import store, { actions } from './slices/index.js';
import contexts from './contexts/index.js';
import resources from './locales/index.js';

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
    renameChannel: (...args) => socket.emit('renameChannel', ...args),
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
  socket.on('renameChannel', (payload) => {
    const { id, name } = payload;
    store.dispatch(actions.renameChannel({ channelId: id, channelName: name }));
  });

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ApiContext.Provider value={api}>
          <App />
        </ApiContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
