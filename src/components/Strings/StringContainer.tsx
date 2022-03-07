import React, { FC, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useUser, useUserAnon } from '../../context/UserContext';
import StringContext from '../../context/StringContext';
import localDateFromMilliseconds from '../../utils/local-date-from-milliseconds';
import StringAuthorView from './StringAuthorView';
import String from './String';
import KnotsContainer from '../Knots/KnotsContainer';
import Loading from '../Loading';
import firebase from '../../utils/firebase';
import StarColumn from './StarColumn';
import StyledLink from '../StyledLink';
import Avatar from '../Profile/Avatar';

const StringContainerWrapper = styled.section``;

const Wrapper = styled.section`
  display: flex;
  margin: 1em;
`;

const StringWrapper = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-bottm-left-radius: 10px;
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
`;

const MetaInfoItem = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 0.2em;

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: flex-start;
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

    const listener = firebase.listenForStringChanges(params.stringId || '');
    const unsubscribe = listener(setString);
    return unsubscribe();
  }, []);

  const isCurrentUserAuthor =
    !isUserAnon &&
    user.authoredStrings.some((id: string) => id === params.stringId);

  if (!isLoaded) {
    return (
      <StringWrapper>
        <Loading width="25px" />
      </StringWrapper>
    );
  }
  if (string === null) {
    return <h2>we couldn&apos;t find what you&apos;re looking for</h2>;
  }

  return (
    <StringContainerWrapper>
      <StringContext.Provider value={string}>
        <Wrapper>
          <StarColumn
            hasCurrentUserStarred={
              !isUserAnon &&
              string.starredUsers.some((id: string) => id === user.id)
            }
            starsCount={string.hasStars ? string.starredUsers.length : 0}
            stringId={string.id}
          />

          <StringWrapper>
            <MetaInfoWrapper>
              <MetaInfoItem>
                <p>posted in</p>
                <StyledLink size="1em" bold="normal" highContrast>
                  <Link
                    to={`../../../../box/${string.associatedBox.id}`}
                    replace
                  >
                    {string.associatedBox.name}
                  </Link>
                </StyledLink>
              </MetaInfoItem>

              <MetaInfoItem>
                <Avatar userId={string.author.id} />
                <StyledLink size="1em" bold="normal" highContrast>
                  <Link to={`../../../../profile/${string.author.id}`} replace>
                    {string.author.username}
                  </Link>
                </StyledLink>

                <p style={{ opacity: '0.8' }}>
                  {localDateFromMilliseconds(string.time)}
                </p>
              </MetaInfoItem>
            </MetaInfoWrapper>

            {isCurrentUserAuthor && <StringAuthorView />}

            <div>
              <String />
            </div>
          </StringWrapper>
        </Wrapper>

        <KnotsContainer string={string} isUserAnon={isUserAnon} />
      </StringContext.Provider>
    </StringContainerWrapper>
  );
};

export default StringContainer;
