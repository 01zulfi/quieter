import React, { FC } from 'react';
import styled from 'styled-components';
import StringCompactView from '../Strings/StringCompactView';

const AuthoredTabWrapper = styled.section`
display: flex;
flex-direction: column-reverse;`;

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
    <AuthoredTabWrapper>
      {authoredStrings.map((stringId) => (
        <div key={stringId}>
          <StringCompactView stringId={stringId} inFeedPage />
        </div>
      ))}
    </AuthoredTabWrapper>
  );
};

export default AuthoredTab;
