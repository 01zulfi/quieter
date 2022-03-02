import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StyledLink from '../StyledLink';

const ExploreItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props: any) => props.theme.base.two};
  border-radius: 5px;
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;

  &:hover {
    outline: 1px solid ${(props: any) => props.theme.frost.two};
    box-shadow: rgb(36 41 51 / 15%) 0px 0px 15px 0px;
    cursor: pointer;
  }

  h3 {
    width: 100%;
    background: ${(props: any) => props.theme.base.three};
    border-bottom: 1px solid ${(props: any) => props.theme.base.three};
    padding: 1em 0.5em;

    &:hover {
      border-bottom: 1px solid ${(props: any) => props.theme.frost.two};
    }
  }
`;

interface ExploreItemProps {
  boxName: string;
  boxDescription: string;
  boxId: string;
}

const ExploreItem: FC<ExploreItemProps> = function ExploreItem({
  boxName,
  boxDescription,
  boxId,
}) {
  return (
    <ExploreItemWrapper>
      <h3>{boxName}</h3>
      <p>{boxDescription}</p>
      <StyledLink size="1.2rem" bold="650">
        <Link to={`/box/${boxId}`}>Visit</Link>
      </StyledLink>
    </ExploreItemWrapper>
  );
};

export default ExploreItem;
