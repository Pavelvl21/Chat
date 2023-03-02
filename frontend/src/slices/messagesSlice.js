/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
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
    builder.addCase(channeslAtions.setInitialState, (state, { payload }) => {
      const { messages } = payload;
      state.messages = messages;
    });
  },
});

export const { actions } = messagesSLice;
export default messagesSLice.reducer;
