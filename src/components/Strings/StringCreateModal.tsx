import React, { FC } from 'react';
import Modal from '../Modal';
import StringCreateForm from './StringCreateForm';

interface StringCreateModalProps {
  closeModal: () => void;
}

const StringCreateModal: FC<StringCreateModalProps> =
  function StringCreateModal({ closeModal }) {
    return (
      <Modal closeModal={closeModal}>
        <StringCreateForm />
      </Modal>
    );
  };

export default StringCreateModal;
