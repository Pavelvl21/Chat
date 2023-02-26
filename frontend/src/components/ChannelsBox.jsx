import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const Channel = (props) => {
  const { channel, isCurrent } = props;
  const variant = isCurrent ? 'secondary' : null;
  return (
    <li key={channel.id} className="nav-item w-100">
      <Button
        type="button"
        variant={variant}
        key={channel.id}
        className="w-100 rounded-0 text-start"
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  );
};

const ChannelsBox = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsData);
  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          channel={channel}
          isCurrent={channel.id === currentChannelId}
        />
      ))}
    </ul>
  );
};

export default ChannelsBox;
