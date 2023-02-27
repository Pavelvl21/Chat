/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

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
});

export const { actions } = messagesSLice;
export default messagesSLice.reducer;
