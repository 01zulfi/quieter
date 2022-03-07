import React, { FC } from 'react';
import styled from 'styled-components';
import StringCompactView from '../Strings/StringCompactView';

const AuthoredTabWrapper = styled.section`
  display: flex;
  flex-direction: column-reverse;
`;

const MessageWrapper = styled.p`
  margin: 1em 0em;
  padding: 0.6em;
  background: ${(props: any) => props.theme.base.three};
  border-radius: 5px;
  text-align: center;
`;

interface AuthoredTabProps {
  authoredStrings: any[];
}

const AuthoredTab: FC<AuthoredTabProps> = function AuthoredTab({
  authoredStrings,
}) {
  if (authoredStrings.length === 0) {
    return <MessageWrapper>User has no authored strings.</MessageWrapper>;
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
