import React, { createContext, useContext } from 'react';

const SetThemeContext = createContext<React.Dispatch<any>>(() => {});

const useSetTheme = () => useContext(SetThemeContext);

export default SetThemeContext;
export { useSetTheme };
