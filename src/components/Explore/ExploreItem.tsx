import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import StyledLink from '../StyledLink';

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
    <section>
      <h3>{boxName}</h3>
      <p>{boxDescription}</p>
      <StyledLink size="1rem" bold="650">
        <Link to={`/box/${boxId}`}>Visit</Link>
      </StyledLink>
    </section>
  );
};

export default ExploreItem;
