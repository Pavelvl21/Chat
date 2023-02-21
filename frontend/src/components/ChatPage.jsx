import axios from 'axios';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

import useAuth from '../hooks/index.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import ChannelsBox from './ChannelsBox.jsx';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/v1/data', { headers: auth.getAuthHeader() });
        dispatch(channelsActions.setInitialState(res.data));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [dispatch, auth]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <ChannelsBox />
        </div>
        <div className="col p-0 h-100">
          chatBox
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
