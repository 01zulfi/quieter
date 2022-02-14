import { useContext, createContext } from 'react';

const ProfileContext = createContext(null);

const useProfile = () => useContext(ProfileContext);

export default ProfileContext;
export { useProfile };
