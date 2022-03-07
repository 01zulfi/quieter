interface StringInterface {
  associatedBox: { name: string; id: string };
  hasKnots: boolean;
  associatedKnots?: string[];
  latestTwoKnots?: string[];
  author: { username: string; id: string };
  associatedUsers: string[];
  id: string;
  title: string;
  content: string;
  time: number;
  hasStars: boolean;
  starredUsers: string[];
}

export default StringInterface;
