import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import Button from '../Button';
import BoxEdit from './BoxEdit';
import BoxDelete from './BoxDelete';

const BoxAdminViewWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 0.4em 0.8em;
  border-radius: 5px;
  gap: 0.5em;
  background: ${(props: any) => props.theme.aurora.five};
`;

const BoxAdminView: FC = function BoxAdminView() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onEditButtonClick = (): void => setShowEditModal(true);
  const onDeleteButtonClick = (): void => setShowDeleteModal(true);

  const onCloseEditModal = (): void => setShowEditModal(false);
  const onCloseDeleteModal = (): void => setShowDeleteModal(false);

  return (
    <BoxAdminViewWrapper>
      <ButtonsWrapper>
        <Button
          status="primary"
          padding="0.5em"
          type="button"
          textContent="Edit box details"
          clickHandler={onEditButtonClick}
        />
        <Button
          status="red"
          padding="0.5em"
          type="button"
          textContent="Delete box"
          clickHandler={onDeleteButtonClick}
        />
      </ButtonsWrapper>

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
    </BoxAdminViewWrapper>
  );
};

export default BoxAdminView;
