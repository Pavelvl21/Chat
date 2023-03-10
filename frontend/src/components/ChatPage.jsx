import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import useHook from '../hooks/index.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import ChannelsBox from './ChannelsBox.jsx';
import ChatBox from './ChatBox.jsx';
import Modal from './Modals/Modal.jsx';
import { useTranslation } from 'react-i18next';

const { useAuth } = useHook;

const ChatPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/v1/data', { headers: auth.getAuthHeader() });
        dispatch(channelsActions.setInitialState(res.data));
      } catch (error) {
        console.error(error.response);
        if (error.response?.status === 401) {
          navigate(routes.loginPagePath());
        }
      }
    };

    fetchData();
  }, [dispatch, auth, navigate]);

  return (
    <>
      <Modal />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsBox />
          </div>
          <div className="col p-0 h-100">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
