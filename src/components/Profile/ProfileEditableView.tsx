import React, { useState, FC } from 'react';
import ProfileEditModal from './ProfileEditModal';
import Button from '../Button';

const ProfileEditableView: FC = function ProfileEditableView() {
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [showUpdateAvatarModal, setShowUpdateAvatarModal] = useState(false);

  const onEditProfileClick = () => setShowProfileEditModal(true);
  const onUpdateProfileClick = () => setShowUpdateAvatarModal(true);
  const onCloseModal = () => {
    setShowProfileEditModal(false);
    setShowUpdateAvatarModal(false);
  };
  return (
    <div>
      <Button
        type="button"
        textContent="Edit profile"
        clickHandler={onEditProfileClick}
        status="primary"
      />

      <Button
        type="button"
        textContent="Update Avatar"
        clickHandler={onUpdateProfileClick}
        status="secondary"
      />

      {showProfileEditModal && (
        <ProfileEditModal
          onCloseModal={onCloseModal}
          forAvatarSelection={false}
        />
      )}

      {showUpdateAvatarModal && (
        <ProfileEditModal onCloseModal={onCloseModal} forAvatarSelection />
      )}
    </div>
  );
};

export default ProfileEditableView;
