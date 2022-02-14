import React, { FC } from 'react';
import Modal from '../Modal';
import ProfileEditForm from './ProfileEditForm';

interface ProfileEditModalProps {
  onCloseModal: () => void;
}

const ProfileEditModal: FC<ProfileEditModalProps> = function ProfileEditModal({
  onCloseModal,
}) {
  return (
    <Modal closeModal={onCloseModal}>
      <ProfileEditForm />
    </Modal>
  );
};

export default ProfileEditModal;
