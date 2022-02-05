import React, { FC, useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import StringDelete from './StringDelete';
import StringEdit from './StringEdit';

const StringAuthorView: FC = function StringAuthorView() {
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
          <p>you are the author of this string</p>
          <Button
            textContent="Edit"
            type="button"
            clickHandler={onEditButtonClick}
          />
          <Button
            textContent="Delete"
            type="button"
            clickHandler={onDeleteButtonClick}
          />
        </div>
      )}

      {showEditModal && !showDeleteModal && (
        <Modal closeModal={onCloseEditModal}>
          <StringEdit />
        </Modal>
      )}

      {showDeleteModal && !showEditModal && (
        <Modal closeModal={onCloseDeleteModal}>
          <StringDelete />
        </Modal>
      )}
    </div>
  );
};

export default StringAuthorView;
