import React from 'react';
import { Modal as BtsModal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices/index.js';

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpened } = useSelector((state) => state.modal);
  const handleClose = () => dispatch(actions.closeModal());

  return (
    <BtsModal show={isOpened} onHide={handleClose} centered>
      <BtsModal.Header closeButton>
        <BtsModal.Title>Modal heading</BtsModal.Title>
      </BtsModal.Header>
      <BtsModal.Body>Woohoo, you are reading this text in a modal!</BtsModal.Body>
      <BtsModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </BtsModal.Footer>
    </BtsModal>
  );
};

export default Modal;
