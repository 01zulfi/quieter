import React, { FC, useState, useEffect } from 'react';
import StringContext from '../../context/StringContext';
import String from './String';
import Knot from '../Knots/Knot';

interface StringCompactViewProps {
  stringId: string;
}

const StringCompactView: FC<StringCompactViewProps> =
  function StringCompactView({ stringId }) {
    const [hasFetched, setHasFetched] = useState(false);
    const [string, setString] = useState<any>({});
    const [knots, setKnots] = useState<any>([]);

    useEffect(() => {
      (async () => {
        const fetchString = await firebase.getString(stringId);
        const latestTwoKnots = await getLatestTwoKnots(
          fetchString.associatedKnots,
        );

        setString(fetchString);
        setKnots(latestTwoKnots);
        setHasFetched(true);
      })();
    }, []);

    return (
      <section>
        {hasFetched && (
          <StringContext.Provider value={string}>
            <String />
            {knots.map((knotId: string) => (
              <Knot id={knotId} />
            ))}
          </StringContext.Provider>
        )}
      </section>
    );
  };

export default StringCompactView;
