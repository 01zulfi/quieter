import React, { FC, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import starFilled from '../../assets/icons/star_filled.svg';
import starDark from '../../assets/icons/star_border_black_24dp.svg';
import starLight from '../../assets/icons/star_border_white_24dp.svg';
import { useUserAnon } from '../../context/UserContext';
import firebase from '../../utils/firebase';
import Loading from '../Loading';

const StarColumnWrapper = styled.div`
  padding: 1em 0.4em;
  background: ${(props: any) => props.theme.base.four};
`;

interface StarColumnProps {
  hasCurrentUserStarred: boolean;
  starsCount: number;
  stringId: string;
}

const StarColumn: FC<StarColumnProps> = function StarColumn({
  hasCurrentUserStarred,
  starsCount,
  stringId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const currentTheme = useTheme();
  const isUserAnon = useUserAnon();

  const starIconDecider = () => {
    if (hasCurrentUserStarred) return starFilled;
    if (currentTheme.name === 'light') return starDark;
    return starLight;
  };

  const onStarClick = async () => {
    if (isUserAnon) return;
    setIsLoading(true);
    if (hasCurrentUserStarred) {
      await firebase.removeStarredUser(stringId);
      setIsLoading(false);
      return;
    }
    await firebase.addStarredUser(stringId);
    setIsLoading(false);
  };

  /* eslint-disable */
  return (
    <StarColumnWrapper>
      {isLoading ? (
        <Loading width="15px" />
      ) : (
        <div onClick={onStarClick}>
          <img src={starIconDecider()} alt="star" />
        </div>
      )}
      <p>{starsCount}</p>
    </StarColumnWrapper>
  );
};

export default StarColumn;
