interface BoxInterface {
  admin: string;
  hasStrings: boolean;
  associatedStrings?: string[];
  id: string;
  joinedUsersCount: number;
  joinedUsers: string[];
  name: string;
  description: string;
}

export default BoxInterface;
