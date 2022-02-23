import React, { FC } from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.img`
  height: 2.5em;
  aspect-ratio: 1;
  border: 1px solid ${(props: any) => props.theme.aurora.five};

  &:hover {
    box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
    cursor: pointer;
  }
`;

const Avatar: FC = function Avatar() {
  return (
    <ImageWrapper
      src="https://www.svgrepo.com/show/401095/alien-monster.svg"
      alt="avatar"
    />
  );
};

export default Avatar;
