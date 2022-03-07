import React, { useState, FC } from 'react';
import styled from 'styled-components/macro';
import ProfileEditModal from './ProfileEditModal';
import Button from '../Button';

const ProfileEditableViewWrapper = styled.section`
  display: flex;
  align-items: center;
  background: ${(props: any) => props.theme.aurora.five};
  padding: 0.3em 1em;
  gap: 1em;
  border-radius: 5px;
`;

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
    <ProfileEditableViewWrapper>
      <Button
        type="button"
        textContent="Edit profile"
        clickHandler={onEditProfileClick}
        status="primary"
        padding="0.6em"
      />

      <Button
        type="button"
        textContent="Update Avatar"
        clickHandler={onUpdateProfileClick}
        status="orange"
        padding="0.6em"
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
    </ProfileEditableViewWrapper>
  );
};

export default ProfileEditableView;
