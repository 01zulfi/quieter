interface StringInterface {
  associatedBox: { name: string; id: string };
  hasKnots: boolean;
  associatedKnots?: string[];
  latestTwoKnots?: string[];
  author: { name: string; id: string };
  associatedUsers: string[];
  id: string;
  title: string;
  content: string;
}

export default StringInterface;
