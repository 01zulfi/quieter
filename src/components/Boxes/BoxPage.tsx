import React, { FC } from 'react';
import styled from 'styled-components';
import BoxContainer from './BoxContainer';
import Sidebar from '../Sidebar';

const BoxPageWrapper = styled.section`
  display: flex;
  flex-direction: row;
  margin: 1em;
  gap: 1em;

  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

const BoxPage: FC = function BoxPage() {
  return (
    <BoxPageWrapper>
      <BoxContainer />
      <Sidebar />
    </BoxPageWrapper>
  );
};

export default BoxPage;
