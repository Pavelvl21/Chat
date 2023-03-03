import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { actions } from '../slices/index.js';

const Channel = (props) => {
  const {
    channel,
    isCurrent,
    handleChooseChannel,
    handleRemoveChannel,
    handleRenameChannel,
  } = props;
  const variant = isCurrent ? 'secondary' : null;
  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable
        ? (
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              type="button"
              variant={variant}
              key={channel.id}
              className="w-100 rounded-0 text-start"
              onClick={handleChooseChannel(channel.id)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
            <Dropdown.Toggle split variant={variant} className="flex-grow-0">
              <span className="visually-hidden">Управление каналом</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRemoveChannel(channel.id)}>Удалить</Dropdown.Item>
              <Dropdown.Item onClick={handleRenameChannel(channel.id)}>Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : (
          <Button
            type="button"
            variant={variant}
            key={channel.id}
            className="w-100 rounded-0 text-start"
            onClick={handleChooseChannel(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        )}
    </li>
  );
};

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsData);
  const handleChooseChannel = (channelId) => () => {
    dispatch(actions.setCurrentChannel({ channelId }));
  };
  const handleAddChannel = () => {
    dispatch(actions.openModal({ modalType: 'addChannel' }));
  };
  const handleRemoveChannel = (channelId) => () => {
    dispatch(actions.openModal({ modalType: 'removeChannel', id: channelId }));
  };
  const handleRenameChannel = (channelId) => () => {
    dispatch(actions.openModal({ modalType: 'renameChannel', id: channelId }));
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAddChannel}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
            handleChooseChannel={handleChooseChannel}
            handleRemoveChannel={handleRemoveChannel}
            handleRenameChannel={handleRenameChannel}
          />
        ))}
      </ul>
    </>
  );
};

export default ChannelsBox;
