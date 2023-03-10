import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
import useHook from '../hooks/index.js';

const { useApi, useAuth } = useHook;

const MessageForm = ({ channel }) => {
  const { t } = useTranslation();
  const api = useApi();
  const { user: { username } } = useAuth();
  const validateSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validateSchema,
    onSubmit: async ({ body }) => {
      const message = {
        body,
        channelId: channel.id,
        username,
      };
      await api.sendMessage(message);
      formik.setSubmitting(false);
      formik.resetForm();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup>
        <Form.Control
          onChange={formik.handleChange}
          name="body"
          aria-label={t('chat.newMessage')}
          value={formik.values.body}
          className="border-0 p-0 ps-2"
          placeholder={t('chat.placeholder')}
        />
        <Button type="submit">{t('chat.send')}</Button>
      </InputGroup>
    </Form>
  );
};

const ChatBox = () => {
  const currentChannel = useSelector((state) => {
    const { channelsData: { channels, currentChannelId } } = state;
    return channels.find((channel) => channel.id === currentChannelId);
  });

  const channelMessages = useSelector((state) => {
    const { messages } = state.messagesData;
    const { currentChannelId } = state.channelsData;
    return messages.filter(({ channelId }) => channelId === currentChannelId);
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        chat info
      </div>
      <div id="message-box" className="chat-messages overflow-auto px-5 ">
        {channelMessages.map(({ id, username, body }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            {': '}
            {body}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageForm channel={currentChannel} />
      </div>
    </div>
  );
};

export default ChatBox;
