import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import UserInterface from '../interfaces/UserInterface';
import firebase from '../utils/firebase';

const UserContext = createContext<any>(null);
const UserAnonymousContext = createContext(false);

const UserProvider: FC = function UserProvider({ children }) {
  const [user, setUser] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const isUserAnon = firebase.isUserAnon();

  useEffect(() => {
    (async () => {
      if (isUserAnon) {
        setIsLoaded(true);
        return;
      }
      const fetchedUserData: UserInterface = await firebase.getUserDoc();
      setUser(fetchedUserData);
      setIsLoaded(true);
    })();

    const listener = firebase.listenForUserChanges();
    const unsubscribe = listener(setUser);
    return unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={isUserAnon ? null : user}>
      <UserAnonymousContext.Provider value={isUserAnon}>
        {isLoaded && children}
      </UserAnonymousContext.Provider>
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
const useUserAnon = () => useContext(UserAnonymousContext);

export default UserProvider;
export { useUser, useUserAnon };
