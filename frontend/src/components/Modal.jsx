import React from 'react';
import { Modal as BtsModal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { actions } from '../slices/index.js';
import useHook from '../hooks/index.js';

const getChannelsNames = ({ channelsData: { channels } }) => channels
  .map(({ name }) => name);

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpened } = useSelector((state) => state.modal);
  const channels = useSelector(getChannelsNames);
  const handleClose = () => dispatch(actions.closeModal());
  const { useApi } = useHook;
  const api = useApi();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .matches(/^[a-z0-9_-]{3,16}$/)
      .notOneOf(channels)
      .required('Required filed'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async ({ name }) => {
      const channel = { name };
      try {
        const data = await api.createChannel(channel);
        dispatch(actions.setCurrentChannel({ channelId: data.id }));
        handleClose();
      } catch (error) {
        console.error(error);
        formik.setSubmitting(false);
        formik.resetForm();
      }
    },
  });

  return (
    <BtsModal show={isOpened} onHide={handleClose} centered>
      <BtsModal.Header closeButton>
        <BtsModal.Title>Добавить канал</BtsModal.Title>
      </BtsModal.Header>
      <BtsModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              disabled={formik.isSubmitting}
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
                disabled={formik.isSubmitting}
              >
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BtsModal.Body>
    </BtsModal>
  );
};

export default Modal;
