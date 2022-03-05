import React, { FC } from 'react';
import styled from 'styled-components';
import localDateFromMilliseconds from '../../utils/local-date-from-milliseconds';

const OverviewWrapper = styled.section`
  background: ${(props: any) => props.theme.base.two};
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  padding: 1em;
  border-radius: 5px;
  margin: 1em 0em;
`;

interface OverviewProps {
  user: any;
}

const Overview: FC<OverviewProps> = function Overview({ user }) {
  const { time, authoredStrings, authoredKnots, adminBoxes, joinedBoxes } =
    user;

  /* eslint-disable react/jsx-one-expression-per-line */
  return (
    <OverviewWrapper>
      <div>Joined on {localDateFromMilliseconds(time)}</div>
      <div>Admin at {adminBoxes.length} boxes.</div>
      <div>Member at {joinedBoxes.length} boxes.</div>
      <div>Authored {authoredStrings.length} strings.</div>
      <div>Authored {authoredKnots.length} knots.</div>
    </OverviewWrapper>
  );
};

export default Overview;
