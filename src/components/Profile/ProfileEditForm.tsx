import React, { FC, useState } from 'react';
import styled from 'styled-components/macro';
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
    align-items: center;

    button {
      align-self: center;
    }
  }
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${(props: any) => props.theme.base.four};
    padding: 0.5em;
    border-radius: 5px;
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
  input[type='checkbox'] {
    padding: 1em;
    appearance: none;
    border-radius: 50%;
    background: ${(props: any) => props.theme.aurora.one};

    &:checked {
      background: ${(props: any) => props.theme.aurora.four};
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

const ProfileEditForm: FC = function ProfileEditForm() {
  const profile = useProfile() || { username: 'DEFAULT', isDataPrivate: false };
  const [username, setUsername] = useState(profile.username);
  const [isDataPrivate, setIsDataPrivate] = useState(profile.isDataPrivate);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (username === 'DEFAULT') {
    return <h4>Unable to load, try refreshing.</h4>;
  }

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const onIsDataPrivateChange = (event: any) =>
    setIsDataPrivate(event.target.checked);

  const onEditFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    await firebase.editUserDoc({ username, isDataPrivate });
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
                Edit username: (max: 10 characters)
                <input
                  type="text"
                  id="username-edit"
                  onChange={onUsernameChange}
                  value={username}
                  required
                  maxLength={10}
                />
              </label>

              <span style={{ width: '50%', textAlign: 'center' }}>
                Note: changing your username will not change all references
                across quieter, but it&apos;ll still link to your profile page.
              </span>

              <label htmlFor="is-data-private-edit">
                Set data private:
                <span>
                  (this will hide overview, authored, and admined tabs on your
                  profile)
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2em',
                  }}
                >
                  <input
                    type="checkbox"
                    name="is-data-private-edit"
                    id="is-data-private-edit"
                    onClick={onIsDataPrivateChange}
                    checked={isDataPrivate}
                    readOnly
                  />
                  <span>{`${isDataPrivate}`}</span>
                </div>
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
