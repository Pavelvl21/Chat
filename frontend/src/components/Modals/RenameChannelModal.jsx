import { useEffect, useRef } from 'react';
import { Modal as BtsModal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useHook from '../../hooks/index.js';

const { useApi } = useHook;

const getChannelsNames = ({ channelsData: { channels } }) => channels
  .map(({ name }) => name);

const RenameChannelModal = ({ handleClose }) => {
  const inputRef = useRef();
  useEffect(() => {
    setTimeout(() => inputRef.select());
  }, []);
  const channelsNames = useSelector(getChannelsNames);
  const channelId = useSelector(({ modal }) => modal.id);
  const channel = useSelector(({ channelsData: { channels } }) => channels
    .find(({ id }) => channelId === id));
  const api = useApi();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .matches(/^[a-z0-9_-]{3,16}$/)
      .notOneOf(channelsNames)
      .required('Required filed'),
  });

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema,
    onSubmit: async ({ name }) => {
      try {
        await api.renameChannel({ name, id: channelId });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <BtsModal.Header closeButton>
        <BtsModal.Title>Переимновать канал</BtsModal.Title>
      </BtsModal.Header>
      <BtsModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
            />
            <label className="visually-hidden" htmlFor="name">{formik.name}</label>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                Отменить
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BtsModal.Body>
    </>
  );
};

export default RenameChannelModal;
