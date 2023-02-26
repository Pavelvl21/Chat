import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
import useHook from '../hooks/index.js';

const MessageForm = ({ channel }) => {
  const { useApi } = useHook;
  const api = useApi();
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
        userName: 'admin',
      };
      await api.sendMessage(message);
      formik.setSubmitting(false);
      formik.resetForm();
      formik.setSubmitting(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup>
        <Form.Control
          onChange={formik.handleChange}
          name="body"
          value={formik.values.body}
          className="border-0 p-0 ps-2"
        />
        <Button type="submit">Send</Button>
      </InputGroup>
    </Form>
  );
};

const ChatBox = () => {
  // const getCurrentChannel = (state) => {
  //   const { channels, currentChannelId } = state.channelsInfo;
  //   return channels.find((c) => c.id === currentChannelId);
  // };
  const channel = useSelector((state) => {
    const { channelsData: { channels } } = state;
    return channels;
  });
  const newMessages = useSelector((state) => {
    const { messages } = state.messagesData;
    return messages;
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        header
      </div>
      <div id="message-box" className="chat-messages overflow-auto px-5 ">
        {newMessages.map((message) => (
          <div key={message.id}>{message.body}</div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageForm channel={channel} />
      </div>
    </div>
  );
};

export default ChatBox;
