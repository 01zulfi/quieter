import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import UserInterface from '../interfaces/UserInterface';
import firebase from '../utils/firebase';

const emptyFunction = () => {};

const UserContext = createContext<any>(null);
const SetUserContext = createContext<any>(emptyFunction);
const UserAnonymousContext = createContext(false);

const UserProvider: FC = function UserProvider({ children }) {
  const [user, setUser] = useState<any>();
  const isUserAnon = firebase.isUserAnon();

  useEffect(() => {
    (async () => {
      if (isUserAnon) return;
      const fetchedUserData: UserInterface = await firebase.getUserDoc();
      setUser(fetchedUserData);
    })();
  }, []);

  const userContextUpdater = useCallback(() => {
    (async () => {
      const fetchedUserData: UserInterface = await firebase.getUserDoc();
      setUser(fetchedUserData);
    })();
  }, []);

  return (
    <UserContext.Provider value={isUserAnon ? null : user}>
      <SetUserContext.Provider
        value={isUserAnon ? emptyFunction : userContextUpdater}
      >
        <UserAnonymousContext.Provider value={isUserAnon}>
          {children}
        </UserAnonymousContext.Provider>
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
const useSetUser = () => useContext(SetUserContext);
const useUserAnon = () => useContext(UserAnonymousContext);

export default UserProvider;
export { useUser, useSetUser, useUserAnon };
