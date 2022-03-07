import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import Avatar from './Avatar';
import { useUser, useUserAnon } from '../../context/UserContext';
import Button from '../Button';
import firebase from '../../utils/firebase';
import Loading from '../Loading';
import ProfileEditableView from './ProfileEditableView';
import ProfileContext from '../../context/ProfileContext';
import Overview from './Overview';
import AuthoredTab from './AuthoredTab';
import AdminedTab from './AdminedTab';

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

const GuestWrapper = styled.h4`
  margin: 2em auto;
  padding: 1em;
  background: ${(props: any) => props.theme.base.two};
  border-radius: 5px;
  text-align: center;
`;

const MessageWrapper = styled.p`
  margin: 1em;
  padding: 1em;
  background: ${(props: any) => props.theme.base.two};
  border-radius: 5px;
  text-align: center;
`;

const Profile: FC = function Profile() {
  const params = useParams();
  const [user, setUser] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const signedInUser = useUser();
  const isUserAnon = useUserAnon();

  useEffect(() => {
    if (isUserAnon) {
      setIsLoaded(true);
      return;
    }

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

  if (!isLoaded) return <Loading width="35px" />;
  if (isUserAnon) {
    return (
      <GuestWrapper>Guest users cannot view other user profiles.</GuestWrapper>
    );
  }

  const isCurrentUserProfile = params.userId === signedInUser.id;

  const onOverviewButtonClick = () => {
    setActiveTab('Overview');
  };
  const onAuthoredButtonClick = () => {
    setActiveTab('Authored');
  };
  const onAdminedButtonClick = () => {
    setActiveTab('Admined');
  };

  const showData = isCurrentUserProfile || user.isDataPrivate;

  return (
    <ProfileWrapper>
      {isCurrentUserProfile && (
        <ProfileContext.Provider value={signedInUser}>
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

      {isCurrentUserProfile && (
        <MessageWrapper>
          {signedInUser.isDataPrivate
            ? "Only you can view the below tabs because you've set your data to private."
            : 'Everyone can view the below tabs. Edit your profile if you wish to hide your data.'}
        </MessageWrapper>
      )}

      {showData ? (
        <>
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

          {activeTab === 'Overview' && <Overview user={user} />}
          {activeTab === 'Authored' && (
            <AuthoredTab authoredStrings={user.authoredStrings} />
          )}
          {activeTab === 'Admined' && (
            <AdminedTab adminedBoxes={user.adminBoxes} />
          )}
        </>
      ) : (
        <MessageWrapper>
          Cannot view their data because it&apos;s set to private.
        </MessageWrapper>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
