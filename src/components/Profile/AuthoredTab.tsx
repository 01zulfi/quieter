import React, { FC } from 'react';
import StringCompactView from '../Strings/StringCompactView';

interface AuthoredTabProps {
  authoredStrings: any[];
}

const AuthoredTab: FC<AuthoredTabProps> = function AuthoredTab({
  authoredStrings,
}) {
  if (authoredStrings.length === 0) {
    return <p>User has no authored strings.</p>;
  }

  return (
    <div>
      {authoredStrings.map((stringId) => (
        <div key={stringId}>
          <StringCompactView stringId={stringId} inFeedPage />
        </div>
      ))}
    </div>
  );
};

export default AuthoredTab;
