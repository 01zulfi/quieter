import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Avatar from './Avatar';
import { useUser } from '../../context/UserContext';
import Button from '../Button';
import firebase from '../../utils/firebase';
import Loading from '../Loading';
import ProfileEditableView from './ProfileEditableView';
import ProfileContext from '../../context/ProfileContext';

const ProfileWrapper = styled.section`
  width: 65%;
  margin: 2em auto;

  @media (max-width: 680px) {
    width: 95%;
  }
`;

const UsernameAndAvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  height: 4em;
  margin-top: 1em;
`;

const UsernameWrapper = styled.h3`
  text-decoration: underline;
`;

const Line = styled.div`
  height: 0.3em;
  margin: 0.5em 0em;
  background: ${(props: any) => props.theme.base.four};
`;

const ButtonsPanel = styled.div`
  background: ${(props: any) => props.theme.base.two};
  display: flex;
  justify-content: space-around;
  padding: 0.3em 0em;
  border-radius: 5px;
`;

const Profile: FC = function Profile() {
  const params = useParams();
  const [user, setUser] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const signedInUser = useUser();

  useEffect(() => {
    if (params.userId === signedInUser.id) {
      setUser(signedInUser);
      setIsLoaded(true);
      return;
    }

    (async () => {
      const fetchUser = await firebase.getNotSignedInUserDoc(
        params.userId || '',
      );
      setUser(fetchUser);
      setIsLoaded(true);
    })();
  }, []);

  const isCurrentUserProfile = params.userId === signedInUser.id;

  if (!isLoaded) return <Loading width="35px" />;

  const onOverviewButtonClick = () => {
    setActiveTab('Overview');
  };
  const onAuthoredButtonClick = () => {
    setActiveTab('Authored');
  };
  const onAdminedButtonClick = () => {
    setActiveTab('Admined');
  };

  return (
    <ProfileWrapper>
      {isCurrentUserProfile && (
        <ProfileContext.Provider value={user}>
          <ProfileEditableView />
        </ProfileContext.Provider>
      )}

      <UsernameAndAvatarWrapper>
        <Avatar userId={user.id} />
        <UsernameWrapper>
          {isCurrentUserProfile ? signedInUser.username : user.username}
        </UsernameWrapper>
      </UsernameAndAvatarWrapper>

      <Line />

      <ButtonsPanel>
        <Button
          type="button"
          textContent="Overview"
          clickHandler={onOverviewButtonClick}
          status={activeTab === 'Overview' ? 'purple' : 'secondary'}
          padding="0.5em"
        />
        <Button
          type="button"
          textContent="Authored"
          clickHandler={onAuthoredButtonClick}
          status={activeTab === 'Authored' ? 'purple' : 'secondary'}
          padding="0.5em"
        />
        <Button
          type="button"
          textContent="Admined"
          clickHandler={onAdminedButtonClick}
          status={activeTab === 'Admined' ? 'purple' : 'secondary'}
          padding="0.5em"
        />
      </ButtonsPanel>
    </ProfileWrapper>
  );
};

export default Profile;
