import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import StringContext from '../../context/StringContext';
import StringAuthorView from './StringAuthorView';
import String from './String';
import Knot from '../Knots/Knot';
import KnotCreate from '../Knots/KnotCreate';

const StringContainer: FC = function StringContainer() {
  const params = useParams();
  const [string, setString] = useState<any>({});
  const user = useUser();

  useEffect(() => {
    (async () => {
      const stringData = await firebase.getString(params.stringId);
      setString(stringData);
    })();
  }, []);

  const isCurrentUserAuthor = user.authoredStrings.find(
    (id: string) => id === params.stringId,
  );

  return (
    <div>
      <StringContext.Provider value={string}>
        {isCurrentUserAuthor && <StringAuthorView />}
        <div>
          <String />
          {string.knots.map((knotId: string) => (
            <div key={knotId}>
              <Knot knotId={knotId} />
            </div>
          ))}
          <KnotCreate />
        </div>
        )
      </StringContext.Provider>
    </div>
  );
};

export default StringContainer;
