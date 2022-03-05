import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Avatar from './Avatar';
import { useUser } from '../../context/UserContext';
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
  height: 0.1em;
  padding-top: 0.5em;
  background: ${(props: any) => props.theme.base.four};
`;

const Profile: FC = function Profile() {
  const params = useParams();
  const [user, setUser] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
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
    </ProfileWrapper>
  );
};

export default Profile;
