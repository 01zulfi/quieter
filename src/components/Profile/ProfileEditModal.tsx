import React, { FC } from 'react';
import Modal from '../Modal';
import ProfileEditForm from './ProfileEditForm';

interface ProfileEditModalProps {
  onCloseModal: () => void;
  forAvatarSelection: boolean;
}

const ProfileEditModal: FC<ProfileEditModalProps> = function ProfileEditModal({
  onCloseModal,
  forAvatarSelection,
}) {
  return (
    <Modal closeModal={onCloseModal}>
      {forAvatarSelection ? <AvatarSelection /> : <ProfileEditForm />}
    </Modal>
  );
};

export default ProfileEditModal;
