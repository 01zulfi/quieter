import React, { FC } from 'react';
import styled from 'styled-components/macro';
import Knot from './Knot';
import KnotCreate from './KnotCreate';
import Avatar from '../Profile/Avatar';

const KnotSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1em;
  margin: 1em;
  gap: 1.5em;
`;

const KnotWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const KnotLeft = styled.div`
  background: ${(props: any) => props.theme.base.four};
  align-self: flex-start;
  margin-top: 0.6em;
  padding: 0.1em;
  width: 5%;

  @media (max-width: 680px) {
    display: none;
  }
`;

const MessageWrapper = styled.p`
  background: ${(props: any) => props.theme.base.four};
  color: ${(props: any) => props.theme.text.two};
  padding: 0.5em 0.5em;
  margin: 1em 0em;
  border-radius: 5px;
`;

interface KnotsContainerInterface {
  string: any;
  isUserAnon: boolean;
}

const KnotsContainer: FC<KnotsContainerInterface> = function KnotsContainer({
  string,
  isUserAnon,
}) {
  return (
    <KnotSectionWrapper>
      {string.hasKnots ? (
        string.associatedKnots.map((knotId: string) => (
          <KnotWrapper key={knotId}>
            <Avatar knotId={knotId} />
            <KnotLeft />
            <Knot knotId={knotId} />
          </KnotWrapper>
        ))
      ) : (
        <MessageWrapper>This string has no knots</MessageWrapper>
      )}
      {!isUserAnon && <KnotCreate />}
    </KnotSectionWrapper>
  );
};

export default KnotsContainer;
