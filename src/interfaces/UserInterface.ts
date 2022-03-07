interface UserInterface {
  adminBoxes?: string[];
  associatedStrings?: string[];
  authoredKnots?: string[];
  authoredStrings?: string[];
  joinedBoxes?: string[];
  id: string;
  username: string;
  email?: string;
  avatarId?: string;
  time?: number;
  isDataPrivate?: boolean;
}

export default UserInterface;
