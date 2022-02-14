interface BoxInterface {
  admin: { username: string; id: string };
  hasStrings: boolean;
  associatedStrings?: string[];
  id: string;
  joinedUsersCount: number;
  joinedUsers: string[];
  name: string;
  description: string;
}

export default BoxInterface;
