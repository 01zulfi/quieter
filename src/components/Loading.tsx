import React, { FC } from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  width: ${(props: any) => props.width};
  aspect-ratio: 1;
  border-radius: 50%;
  border: 4px solid ${(props: any) => props.theme.text.four};
  border-bottom-color: ${(props: any) => props.theme.frost.two};

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  animation: 1s linear infinite spin;
`;

interface LoadingProps {
  width: string;
}

const Loading: FC<LoadingProps> = function Loading({ width }) {
  return <LoadingWrapper width={width} />;
};

export default Loading;
