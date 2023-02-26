import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { actions } from '../slices/index.js';

const Channel = (props) => {
  const {
    channel,
    isCurrent,
    handleChooseChannel,
  } = props;
  const variant = isCurrent ? 'secondary' : null;
  return (
    <li key={channel.id} className="nav-item w-100">
      <Button
        type="button"
        variant={variant}
        key={channel.id}
        className="w-100 rounded-0 text-start"
        onClick={handleChooseChannel}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  );
};

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsData);
  const handleChooseChannel = (channelId) => () => {
    dispatch(actions.setCurrentChannel({ channelId }));
  };
  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          channel={channel}
          isCurrent={channel.id === currentChannelId}
          handleChooseChannel={handleChooseChannel(channel.id)}
        />
      ))}
    </ul>
  );
};

export default ChannelsBox;
