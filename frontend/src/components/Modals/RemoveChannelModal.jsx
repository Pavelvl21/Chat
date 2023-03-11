import { Modal as BtsModal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useHook from '../../hooks/index.js';

const { useApi } = useHook;

const RemoveChannelModal = ({ handleClose }) => {
  const { t } = useTranslation();
  const channelId = useSelector(({ modal }) => modal.id);
  const api = useApi();
  const handleRemove = async () => {
    try {
      await api.removeChannel({ id: channelId });
      toast.success(t('channels.removed'));
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BtsModal.Header closeButton>
        <BtsModal.Title>{t('modals.remove')}</BtsModal.Title>
      </BtsModal.Header>
      <BtsModal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
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
            variant="danger"
            type="button"
            onClick={handleRemove}
          >
            {t('modals.confirm')}
          </Button>
        </div>
      </BtsModal.Body>
    </>
  );
};

export default RemoveChannelModal;
