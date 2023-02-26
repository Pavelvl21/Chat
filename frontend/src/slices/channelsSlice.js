/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

// BEGIN (write your solution here)
const initialState = {
  channels: [],
  currentChannelId: null,
};

const commentsSlice = createSlice({
  name: 'channelsData',
  initialState,
  reducers: {
    setInitialState: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      const { channelId } = payload;
      state.currentChannelId = channelId;
    },
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;
// END
