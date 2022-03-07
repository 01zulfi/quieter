import React, { FC, useState } from 'react';
import styled from 'styled-components/macro';
import Modal from '../Modal';
import Button from '../Button';
import StringDelete from './StringDelete';
import StringEdit from './StringEdit';

const StringAuthorViewWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  background: ${(props: any) => props.theme.aurora.five};
  border-radius: 5px;
  padding: 0.5em 0em;

  div {
    display: flex;
    align-items: center;
    margin-left: 1em;
    gap: 1em;
    font-weight: 700;
  }
`;

const StringAuthorView: FC = function StringAuthorView() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onEditButtonClick = (): void => setShowEditModal(true);
  const onDeleteButtonClick = (): void => setShowDeleteModal(true);

  const onCloseEditModal = (): void => setShowEditModal(false);
  const onCloseDeleteModal = (): void => setShowDeleteModal(false);

  return (
    <StringAuthorViewWrapper>
      <div>
        <Button
          textContent="Edit"
          type="button"
          clickHandler={onEditButtonClick}
          status="primary"
          padding="0.5em"
        />
        <Button
          textContent="Delete"
          type="button"
          clickHandler={onDeleteButtonClick}
          status="red"
          padding="0.5em"
        />
      </div>

      {showEditModal && !showDeleteModal && (
        <Modal closeModal={onCloseEditModal}>
          <StringEdit closeModal={onCloseEditModal} />
        </Modal>
      )}

      {showDeleteModal && !showEditModal && (
        <Modal closeModal={onCloseDeleteModal}>
          <StringDelete />
        </Modal>
      )}
    </StringAuthorViewWrapper>
  );
};

export default StringAuthorView;
