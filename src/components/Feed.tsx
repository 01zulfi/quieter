import React, { FC } from 'react';
import { useUser } from '../context/UserContext';
import StringCompactView from './Strings/StringCompactView';

const Feed: FC = function Feed() {
  const user = useUser();

  const strings = user.associatedStrings;

  return (
    <section>
      {strings.map((stringId: string) => (
        <div key={stringId}>
          <StringCompactView stringId={stringId} />
        </div>
      ))}
    </section>
  );
};

export default Feed;