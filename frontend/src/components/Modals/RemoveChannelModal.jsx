import { Modal as BtsModal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useHook from '../../hooks/index.js';

const { useApi } = useHook;

const RemoveChannelModal = ({ handleClose }) => {
  const channelId = useSelector(({ modal }) => modal.id);
  const api = useApi();
  const handleRemove = async () => {
    try {
      await api.removeChannel({ id: channelId });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BtsModal.Header closeButton>
        <BtsModal.Title>Удалить канал</BtsModal.Title>
      </BtsModal.Header>
      <BtsModal.Body>
        <p className="lead">Уверены?</p>
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
            variant="danger"
            type="button"
            onClick={handleRemove}
          >
            Удалить
          </Button>
        </div>
      </BtsModal.Body>
    </>
  );
};

export default RemoveChannelModal;
