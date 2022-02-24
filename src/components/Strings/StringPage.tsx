import React, { FC } from 'react';
import styled from 'styled-components';
import StringContainer from './StringContainer';

const StringPageWrapper = styled.section`
  padding: 1em 1em;

  @media (min-width: 680px) {
    margin-right: 4rem;
  }
`;

const StringPage: FC = function StringPage() {
  return (
    <StringPageWrapper>
      <StringContainer />
    </StringPageWrapper>
  );
};

export default StringPage;
