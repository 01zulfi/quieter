import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { useString } from '../../context/StringContext';

const StringWrapper = styled.section`
  display: flex;
  margin-top: 1em;
  flex-direction: column;
`;
const StringTitleWrapper = styled.h2`
  width: 100%;
  padding: 0em 0.5em;
  border-bottom: 2px solid ${(props: any) => props.theme.base.four};
  color: ${(props: any) => props.theme.text.two};
  text-align: start;
`;
const StringContentWrapper = styled.p`
  margin: 1em 0em;
  padding: 0em 0.5em;
  color: ${(props: any) => props.theme.text.one};
  white-space: pre-wrap;
`;

const String: FC = function String() {
  const string = useString() || { id: 'DEFAULT', content: '', title: '' };

  return (
    <StringWrapper>
      {string.id !== 'DEFAULT' ? (
        <>
          <StringTitleWrapper>{string.title}</StringTitleWrapper>
          <StringContentWrapper>{`${string.content}`}</StringContentWrapper>
        </>
      ) : (
        <h4>Unable to load, try refreshing.</h4>
      )}
    </StringWrapper>
  );
};

export default String;
