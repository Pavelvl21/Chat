import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import useHook from '../hooks/index.js';

const { useApi, useAuth } = useHook;

const MessageForm = ({ channel }) => {
  const { t } = useTranslation();
  const api = useApi();
  const { user: { username } } = useAuth();
  const inputRef = useRef();
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
      try {
        await api.sendMessage(message);
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
      formik.setSubmitting(false);
      inputRef.current.focus();
    },
  });

  const isInvalid = !formik.dirty || !formik.isValid;

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
        <Button type="submit" variant="group-vertical" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

const ChatBox = () => {
  const { t } = useTranslation();
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
        <p className="m-0">
          <b>
            {`# ${currentChannel?.name}`}
          </b>
        </p>
        <span className="text-muted">
          {`${channelMessages.length} ${t('chat.messageCount', { count: channelMessages.length })}`}
        </span>
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
