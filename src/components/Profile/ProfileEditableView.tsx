import React, { useState, FC } from 'react';
import ProfileEditModal from './ProfileEditModal';
import Button from '../Button';

const ProfileEditableView: FC = function ProfileEditableView() {
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);

  const onEditProfileClick = () => setShowProfileEditModal(true);
  const onCloseModal = () => setShowProfileEditModal(false);

  return (
    <div>
      <Button
        type="button"
        textContent="Edit profile"
        clickHandler={onEditProfileClick}
        status="secondary"
      />

      {showProfileEditModal && (
        <ProfileEditModal
          onCloseModal={onCloseModal}
          forAvatarSelection={false}
        />
      )}
    </div>
  );
};

export default ProfileEditableView;
