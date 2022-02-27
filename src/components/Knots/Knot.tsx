import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import localDateFromMilliseconds from '../../utils/local-date-from-milliseconds';
import firebase from '../../utils/firebase';
import { useUser, useUserAnon } from '../../context/UserContext';
import StyledLink from '../StyledLink';
import Loading from '../Loading';
import Button from '../Button';

const KnotWrapper = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: ${(props: any) => props.theme.base.three};
  border: 0px solid ${(props: any) => props.theme.frost.one};
  border-left-width: thick;
  flex-grow: 1;
`;

const AuthorWrapper = styled.div`
  background: ${(props: any) => props.theme.base.four};
  font-size: 0.9em;
  padding: 0.1em 0.3em;
  display: flex;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding: 0.3em 0.3em;
`;

const NameAndTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
`;

interface KnotProps {
  knotId: string;
}

const Knot: FC<KnotProps> = function Knot({ knotId }) {
  const [knot, setKnot] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useUser();
  const isUserAnon = useUserAnon();

  useEffect(() => {
    (async () => {
      const fetchKnot = await firebase.getKnot(knotId);
      setKnot(fetchKnot);
      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) return <Loading width="15px" />;
  if (!knot) return <h4>Unable to load</h4>;

  const isCurrentUserAuthor =
    !isUserAnon && user.authoredKnots.some((id: string) => knotId === id);

  const deleteHandler = async () => {
    await firebase.deleteKnot({ knotId, stringId: knot.associatedString });
  };

  return (
    <KnotWrapper>
      <AuthorWrapper>
        <NameAndTimeWrapper>
          <StyledLink size="1em" bold="normal" highContrast>
            <Link to={`../../../../profile/${knot.author.id}`}>
              {knot.author.username}
            </Link>
          </StyledLink>
          <p style={{ opacity: '0.8' }}>
            {localDateFromMilliseconds(knot.time)}
          </p>
        </NameAndTimeWrapper>

        {isCurrentUserAuthor && (
          <Button
            textContent="Delete"
            status="red"
            padding="0.4em"
            clickHandler={deleteHandler}
            type="button"
          />
        )}
      </AuthorWrapper>

      <ContentWrapper>
        <p>{knot.content}</p>
      </ContentWrapper>
    </KnotWrapper>
  );
};

export default Knot;
