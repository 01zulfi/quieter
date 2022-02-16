import React, { FC } from 'react';
import Modal from '../Modal';
import BoxCreateForm from './BoxCreateForm';

interface BoxCreateModalProps {
  closeModal: () => void;
}

const BoxCreateModal: FC<BoxCreateModalProps> = function BoxCreateModal({
  closeModal,
}) {
  return (
    <Modal closeModal={closeModal}>
      <BoxCreateForm />
    </Modal>
  );
};

export default BoxCreateModal;
