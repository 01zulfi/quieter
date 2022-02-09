import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser, useUserAnon } from '../../context/UserContext';
import StringContext from '../../context/StringContext';
import StringAuthorView from './StringAuthorView';
import String from './String';
import Knot from '../Knots/Knot';
import KnotCreate from '../Knots/KnotCreate';
import Loading from '../Loading';
import firebase from '../../utils/firebase';

const StringContainer: FC = function StringContainer() {
  const params = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [string, setString] = useState<any>({});
  const user = useUser();
  const isUserAnon = useUserAnon();

  useEffect(() => {
    (async () => {
      const stringData = await firebase.getString(params.stringId || '');
      setString(stringData);
      setIsLoaded(true);
    })();
  }, []);

  const isCurrentUserAuthor =
    !isUserAnon &&
    user.authoredStrings.some((id: string) => id === params.stringId);

  if (!isLoaded) return <Loading />;

  return (
    <section>
      <StringContext.Provider value={string}>
        {isCurrentUserAuthor && <StringAuthorView />}

        <div>
          <String />

          {string.associatedKnots.length > 0 &&
            string.associatedKnots.map((knotId: string) => (
              <div key={knotId}>
                <Knot knotId={knotId} />
              </div>
            ))}

          {!isUserAnon && <KnotCreate />}
        </div>
      </StringContext.Provider>
    </section>
  );
};

export default StringContainer;
