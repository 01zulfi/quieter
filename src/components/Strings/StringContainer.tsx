import React, { FC, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser, useUserAnon } from '../../context/UserContext';
import StringContext from '../../context/StringContext';
import StringAuthorView from './StringAuthorView';
import String from './String';
import Knot from '../Knots/Knot';
import KnotCreate from '../Knots/KnotCreate';
import Loading from '../Loading';
import firebase from '../../utils/firebase';
import StyledLink from '../StyledLink';

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
  if (string === null) {
    return <h2>we couldn&apos;t find what you&apos;re looking for</h2>;
  }

  return (
    <section>
      <StringContext.Provider value={string}>
        <div>
          <p>posted in</p>
          <StyledLink size="1em" bold="normal">
            <Link to={`../../../../box/${string.associatedBox.id}`} replace>
              {string.associatedBox.name}
            </Link>
          </StyledLink>
        </div>

        {isCurrentUserAuthor && <StringAuthorView />}

        <div>
          <String />

          {string.hasKnots &&
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
