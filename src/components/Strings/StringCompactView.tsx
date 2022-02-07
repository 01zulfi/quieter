import React, { FC, useState, useEffect } from 'react';
import firebase from '../../utils/firebase';
import StringContext from '../../context/StringContext';
import String from './String';
import Knot from '../Knots/Knot';
import Loading from '../Loading';

interface StringCompactViewProps {
  stringId: string;
}

const StringCompactView: FC<StringCompactViewProps> =
  function StringCompactView({ stringId }) {
    const [hasFetched, setHasFetched] = useState(false);
    const [string, setString] = useState<any>({});

    useEffect(() => {
      (async () => {
        const fetchString = await firebase.getString(stringId);

        setString(fetchString);
        setHasFetched(true);
      })();
    }, []);

    return (
      <section>
        {hasFetched ? (
          <StringContext.Provider value={string}>
            <String />
            {string.latestTwoKnots.length > 0 &&
              string.latestTwoKnots.map((knotId: string) => (
                <div key={knotId}>
                  <Knot knotId={knotId} />
                </div>
              ))}
          </StringContext.Provider>
        ) : (
          <Loading />
        )}
      </section>
    );
  };

export default StringCompactView;
