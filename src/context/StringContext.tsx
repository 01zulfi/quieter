import React, { FC, useContext, createContext } from 'react';

const StringContext = createContext(null);

const StringProvider: FC = function StringProvider({ children }) {
  const string = firebase.getString();

  return (
    <StringContext.Provider value={string}>{children}</StringContext.Provider>
  );
};

const useString = () => useContext(StringContext);

export default StringProvider;
export { useString };
