import { useContext, createContext } from 'react';

const StringContext = createContext(null);

const useString = () => useContext(StringContext);

export default StringContext;
export { useString };
