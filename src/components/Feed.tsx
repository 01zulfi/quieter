import React, { FC, useState, useEffect } from 'react';
import StringCompactView from './Strings/StringCompactView';
import firebase from '../utils/firebase';
import Loading from './Loading';

const Feed: FC = function Feed() {
  const [feedStrings, setFeedStrings] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchData = await firebase.getFeedStrings();
      setFeedStrings(fetchData);
      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) return <Loading />;

  if (feedStrings.length === 0) {
    return <h2>No feed available. Populate it by getting involved!</h2>;
  }

  return (
    <section>
      {feedStrings.map((stringId: string) => (
        <div key={stringId}>
          <StringCompactView stringId={stringId} />
        </div>
      ))}
    </section>
  );
};

export default Feed;
