import React, { FC, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useUser, useUserAnon } from '../../context/UserContext';
import StringContext from '../../context/StringContext';
import StringAuthorView from './StringAuthorView';
import String from './String';
import Knot from '../Knots/Knot';
import KnotCreate from '../Knots/KnotCreate';
import Loading from '../Loading';
import firebase from '../../utils/firebase';
import StyledLink from '../StyledLink';

const StringWrapper = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
  background: ${(props: any) => props.theme.base.two};
`;

const MetaInfoWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  background: ${(props: any) => props.theme.base.three};
  width: 100%;
  color: ${(props: any) => props.theme.text.two};
  font-size: 0.9em;
  opacity: 0.9;
  padding: 0 1em;

  div {
    flex-grow: 1;
    max-width: fit-content;
  }
`;

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
    <StringWrapper>
      <StringContext.Provider value={string}>
        <MetaInfoWrapper>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>posted in</p>
            <StyledLink size="1em" bold="normal" black>
              <Link to={`../../../../box/${string.associatedBox.id}`} replace>
                {string.associatedBox.name}
              </Link>
            </StyledLink>
          </div>

          <div>
            <StyledLink size="1em" bold="normal" black>
              <Link to={`../../../../profile/${string.author.id}`} replace>
                {string.author.username}
              </Link>
            </StyledLink>
          </div>
        </MetaInfoWrapper>

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
    </StringWrapper>
  );
};

export default StringContainer;
