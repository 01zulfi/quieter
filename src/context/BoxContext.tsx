import { createContext, useContext } from 'react';

const BoxContext = createContext(null);

const useBox = () => useContext(BoxContext);

export default BoxContext;
export { useBox };
