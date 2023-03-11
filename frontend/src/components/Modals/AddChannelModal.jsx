import React, { useEffect, useRef } from 'react';
import { Modal as BtsModal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { actions } from '../../slices/index.js';
import useHook from '../../hooks/index.js';

const { useApi } = useHook;

const getChannelsNames = ({ channelsData: { channels } }) => channels
  .map(({ name }) => name);

const AddChannelModal = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(getChannelsNames);
  const api = useApi();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .notOneOf(channels, 'modals.uniq')
      .required('modals.required'),
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
      }
    },
  });

  return (
    <>
      <BtsModal.Header closeButton>
        <BtsModal.Title>{t('modals.add')}</BtsModal.Title>
      </BtsModal.Header>
      <BtsModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              className="mb-2"
              ref={inputRef}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
            />
            <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BtsModal.Body>
    </>
  );
};

export default AddChannelModal;
