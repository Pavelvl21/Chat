import { useDispatch, useSelector } from 'react-redux';
import { Modal as BtsModal } from 'react-bootstrap';
import { actions } from '../../slices/index.js';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';

const mapping = {
  addChannel: AddChannelModal,
  removeChannel: RemoveChannelModal,
};

const Modal = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(actions.closeModal());
  const { isOpened, modalType } = useSelector((state) => state.modal);
  const ModalCoponent = mapping[modalType];

  return (
    <BtsModal show={isOpened} onHide={handleClose} centered>
      {ModalCoponent && <ModalCoponent handleClose={handleClose} />}
    </BtsModal>
  );
};

export default Modal;
