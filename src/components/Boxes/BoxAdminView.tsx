import React, { FC, useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import BoxEdit from './BoxEdit';
import BoxDelete from './BoxDelete';

const BoxAdminView: FC = function BoxAdminView() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onEditButtonClick = (): void => setShowEditModal(true);
  const onDeleteButtonClick = (): void => setShowDeleteModal(true);

  const onCloseEditModal = (): void => setShowEditModal(false);
  const onCloseDeleteModal = (): void => setShowDeleteModal(false);

  return (
    <div>
      {!showEditModal && !showDeleteModal && (
        <div>
          <p>you are the admin of this box</p>
          <Button
            type="button"
            textContent="Edit box details"
            clickHandler={onEditButtonClick}
          />
          <Button
            type="button"
            textContent="Delete box"
            clickHandler={onDeleteButtonClick}
          />
        </div>
      )}
      {showEditModal && !showDeleteModal && (
        <Modal closeModal={onCloseEditModal}>
          <BoxEdit />
        </Modal>
      )}
      {showDeleteModal && !showEditModal && (
        <Modal closeModal={onCloseDeleteModal}>
          <BoxDelete />
        </Modal>
      )}
    </div>
  );
};

export default BoxAdminView;
