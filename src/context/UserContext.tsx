import React, { FC, createContext, useContext } from 'react';

const UserContext = createContext(null);
const UserAnonymousContext = createContext(null);

const UserProvider: FC = function UserProvider({ children }) {
  const user = firebase.getUser(); // TODO: write getUser function in utils/firebase
  const isUserAnon = firebase.isUserAnon(); // TODO: write isUserAnon function in utils/firebase

  return (
    <UserContext.Provider value={user}>
      <UserAnonymousContext.Provider value={isUserAnon}>
        {children}
      </UserAnonymousContext.Provider>
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
const useUserAnon = () => useContext(UserAnonymousContext);

export default UserProvider;
export { useUser, useUserAnon };
