/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import remove from 'lodash/remove.js';
import { actions as channeslAtions } from './channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSLice = createSlice({
  name: 'messagesData',
  initialState,
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      state.messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channeslAtions.setInitialState, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      })
      .addCase(channeslAtions.removeChannel, (state, { payload }) => {
        const { channelId } = payload;
        remove(state.messages, (message) => message.channelId === channelId);
      });
  },
});

export const { actions } = messagesSLice;
export default messagesSLice.reducer;
