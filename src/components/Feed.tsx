import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import StringCompactView from './Strings/StringCompactView';
import firebase from '../utils/firebase';
import Loading from './Loading';
import { useUserAnon } from '../context/UserContext';

const FeedWrapper = styled.section`
  flex-grow: 1;
`;

const Feed: FC = function Feed() {
  const [feedStrings, setFeedStrings] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const isUserAnon = useUserAnon();

  useEffect(() => {
    (async () => {
      if (isUserAnon) {
        setIsLoaded(true);
        return;
      }
      const fetchData = await firebase.getFeedStrings();
      setFeedStrings(fetchData);
      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) return <Loading width="35px" />;

  if (!feedStrings) {
    return <h2>No feed available. Populate it by getting involved!</h2>;
  }

  if (feedStrings.length === 0) {
    return <h2>No feed available. Populate it by getting involved!</h2>;
  }

  return (
    <FeedWrapper>
      {feedStrings.map((stringId: string) => (
        <div key={stringId}>
          <StringCompactView stringId={stringId} inFeedPage />
        </div>
      ))}
    </FeedWrapper>
  );
};

export default Feed;
