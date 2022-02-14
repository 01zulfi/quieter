import React, { FC, useState } from 'react';
import firebase from '../../utils/firebase';
import { useProfile } from '../../context/ProfileContext';
import Button from '../Button';

const ProfileEditForm: FC = function ProfileEditForm() {
  const profile = useProfile() || { username: '' };
  const [username, setUsername] = useState(profile.username);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const onEditFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await firebase.editUserDoc({ username });
  };

  return (
    <div>
      <form onSubmit={onEditFormSubmit}>
        <label htmlFor="username-edit">
          edit username
          <input type="text" onChange={onUsernameChange} value={username} />
        </label>
        <Button type="submit" textContent="Update" clickHandler={() => {}} />
      </form>
    </div>
  );
};

export default ProfileEditForm;
