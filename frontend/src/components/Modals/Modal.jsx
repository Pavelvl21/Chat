import { useDispatch, useSelector } from 'react-redux';
import { Modal as BtsModal } from 'react-bootstrap';
import { actions } from '../../slices/index.js';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const mapping = {
  addChannel: AddChannelModal,
  removeChannel: RemoveChannelModal,
  renameChannel: RenameChannelModal,
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
