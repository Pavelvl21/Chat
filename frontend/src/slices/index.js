import { configureStore } from '@reduxjs/toolkit';

import channelsReducer, { actions as channeslAtions } from './channelsSlice.js';
import messagesReducer, { actions as messagesActions } from './messagesSlice.js';

const actions = {
  ...channeslAtions,
  ...messagesActions,
};

export { actions };
export default configureStore({
  reducer: {
    channelsData: channelsReducer,
    messagesData: messagesReducer,
  },
});
