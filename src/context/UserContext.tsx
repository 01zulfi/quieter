import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import firebase from '../utils/firebase';

const emptyFunction = () => {};

const UserContext = createContext(null);
const SetUserContext = createContext<React.Dispatch<any>>(emptyFunction);
const UserAnonymousContext = createContext(false);

const UserProvider: FC = function UserProvider({ children }) {
  const [user, setUser] = useState<any>();
  const isUserAnon = firebase.isUserAnon();

  useEffect(() => {
    (async () => {
      if (isUserAnon) return;
      const fetchedUserData = await firebase.getUserDoc();
      setUser(fetchedUserData);
    })();
  }, []);

  return (
    <UserContext.Provider value={isUserAnon ? null : user}>
      <SetUserContext.Provider value={isUserAnon ? emptyFunction : setUser}>
        <UserAnonymousContext.Provider value={isUserAnon}>
          {children}
        </UserAnonymousContext.Provider>
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
const useUserAnon = () => useContext(UserAnonymousContext);

export default UserProvider;
export { useUser, useUserAnon };
