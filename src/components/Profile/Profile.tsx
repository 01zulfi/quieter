import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import firebase from '../../utils/firebase';
import Loading from '../Loading';
import ProfileEditableView from './ProfileEditableView';
import ProfileContext from '../../context/ProfileContext';

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

  if (!isLoaded) return <Loading />;

  return (
    <div>
      {isCurrentUserProfile && (
        <ProfileContext.Provider value={user}>
          <ProfileEditableView />
        </ProfileContext.Provider>
      )}

      <h3>{user.username}</h3>
    </div>
  );
};

export default Profile;
