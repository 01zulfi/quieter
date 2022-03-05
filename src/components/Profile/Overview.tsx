import React, { FC } from 'react';
import localDateFromMilliseconds from '../../utils/local-date-from-milliseconds';

interface OverviewProps {
  user: any;
}

const Overview: FC<OverviewProps> = function Overview({ user }) {
  const { time, authoredStrings, authoredKnots, adminBoxes, joinedBoxes } =
    user;

  /* eslint-disable react/jsx-one-expression-per-line */
  return (
    <section>
      <div>Joined on {localDateFromMilliseconds(time)}</div>
      <div>Admin at {adminBoxes.length} boxes.</div>
      <div>Member at {joinedBoxes.length} boxes.</div>
      <div>Authored {authoredStrings.length} strings.</div>
      <div>Authored {authoredKnots.length} knots.</div>
    </section>
  );
};

export default Overview;
