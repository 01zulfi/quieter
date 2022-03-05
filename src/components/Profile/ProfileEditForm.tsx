import React, { FC, useState } from 'react';
import styled from 'styled-components';
import firebase from '../../utils/firebase';
import { useProfile } from '../../context/ProfileContext';
import Button from '../Button';
import Loading from '../Loading';

const ProfileEditFormWrapper = styled.section`
  margin: 1em;
  border-radius: 10px;
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
  background: ${(props: any) => props.theme.base.three};
  padding: 1em 1em;

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;

    button {
      align-self: center;
    }
  }
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    background: ${(props: any) => props.theme.frost.one};
    border: 0;
    border: 1px solid ${(props: any) => props.theme.frost.four};
    font-weight: normal;
    border-radius: 5px;
    padding: 1em;
    font-size: 1.1em;
    &:focus {
      outline: 2px solid ${(props: any) => props.theme.text.four};
    }
  }
`;

const ProfileEditForm: FC = function ProfileEditForm() {
  const profile = useProfile() || { username: '' };
  const [username, setUsername] = useState(profile.username);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const onEditFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    await firebase.editUserDoc({ username });
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <ProfileEditFormWrapper>
      {isLoading ? (
        <Loading width="15px" />
      ) : (
        <div>
          {isSubmitted ? (
            <h3>Profile updated.</h3>
          ) : (
            <form onSubmit={onEditFormSubmit}>
              <label htmlFor="username-edit">
                Edit username:
                <input
                  type="text"
                  id="username-edit"
                  onChange={onUsernameChange}
                  value={username}
                  required
                  maxLength={10}
                />
              </label>
              <Button
                status="primary"
                type="submit"
                textContent="Update"
                clickHandler={() => {}}
              />
            </form>
          )}
        </div>
      )}
    </ProfileEditFormWrapper>
  );
};

export default ProfileEditForm;
