import { configureStore } from '@reduxjs/toolkit';

import channelsReducer, { actions as channeslAtions } from './channelsSlice.js';
import messagesReducer, { actions as messagesActions } from './messagesSlice.js';
import modalReducer, { actions as modalActions } from './modalSlice.js';

const actions = {
  ...channeslAtions,
  ...messagesActions,
  ...modalActions,
};

export { actions };
export default configureStore({
  reducer: {
    channelsData: channelsReducer,
    messagesData: messagesReducer,
    modal: modalReducer,
  },
});
