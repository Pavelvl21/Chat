import { useEffect, useRef } from 'react';
import { Modal as BtsModal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import useHook from '../../hooks/index.js';

const { useApi } = useHook;

const getChannelsNames = ({ channelsData: { channels } }) => channels
  .map(({ name }) => name);

const RenameChannelModal = ({ handleClose }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => {
    setTimeout(() => inputRef.current.select());
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
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .notOneOf(channelsNames, 'modals.uniq')
      .required('modals.required'),
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
        <BtsModal.Title>{t('modals.rename')}</BtsModal.Title>
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
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
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

export default RenameChannelModal;
