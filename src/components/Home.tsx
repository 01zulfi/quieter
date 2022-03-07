import React, { FC } from 'react';
import styled from 'styled-components/macro';
import Feed from './Feed';
import Sidebar from './Sidebar';

const HomeWrapper = styled.article`
  display: flex;
  flex-direction: row-reverse;
  margin: 1em;
  gap: 4em;

  @media (max-width: 680px) {
    flex-direction: column;
    gap: 1em;
  }
`;

const Home: FC = function Home() {
  return (
    <HomeWrapper>
      <Sidebar />
      <Feed />
    </HomeWrapper>
  );
};

export default Home;
