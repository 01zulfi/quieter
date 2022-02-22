import React, { FC } from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar';
import StringContainer from './StringContainer';

const StringPageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1em 1em;

  @media (min-width: 680px) {
    flex-direction: row-reverse;
    align-items: baseline;
  }
`;

const StringPage: FC = function StringPage() {
  return (
    <StringPageWrapper>
      <Sidebar />
      <StringContainer />
    </StringPageWrapper>
  );
};

export default StringPage;
