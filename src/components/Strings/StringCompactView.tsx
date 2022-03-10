import React, { FC, useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { Link } from 'react-router-dom';
import StyledLink from '../StyledLink';
import firebase from '../../utils/firebase';
import StringContext from '../../context/StringContext';
import Loading from '../Loading';
import commentLight from '../../assets/icons/chat_bubble_outline_white_24dp.svg';
import commentDark from '../../assets/icons/chat_bubble_outline_black_24dp.svg';
import starDark from '../../assets/icons/star_border_black_24dp.svg';
import starLight from '../../assets/icons/star_border_white_24dp.svg';

const StringCompactViewWrapper = styled.section`
  background: ${(props: any) => props.theme.base.two};
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
  border-radius: 5px;
  margin: 1em 0em;
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  padding-left: 0.3em;
  border: 0px solid ${(props: any) => props.theme.aurora.five};
  border-left-width: 0.5em;

  &:hover {
    outline: 1px solid ${(props: any) => props.theme.frost.two};
    border: 0px solid ${(props: any) => props.theme.frost.two};
    border-left-width: 0.5em;
    box-shadow: rgb(36 41 51 / 15%) 0px 0px 25px 0px;
  }
`;

/* eslint-disable no-confusing-arrow */
/* eslint-disable indent */
const StringTitleWrapper = styled.h4`
  width: 100%;
  padding: 1em 0.1em;
  border-bottom: 2px solid ${(props: any) => props.theme.base.four};
  color: ${(props: any) => props.theme.text.one};
  text-align: start;
  font-weight: normal;

  &:hover {
    text-decoration: underline;
    color: ${(props: any) =>
      props.theme.name === 'light' ? 'black' : 'white'};
    cursor: pointer;
  }
`;

const MetaInfoWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-bottom: 0.8em;
  font-size: 0.95em;
`;

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BoxLinkWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5em;

  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

const KnotNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
`;

const StarNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
`;

interface StringCompactViewProps {
  stringId: string;
  inBoxPage?: boolean;
  inFeedPage?: boolean;
}

const StringCompactView: FC<StringCompactViewProps> =
  function StringCompactView({ stringId, inBoxPage, inFeedPage }) {
    const [hasFetched, setHasFetched] = useState(false);
    const [string, setString] = useState<any>({});
    const currentTheme = useTheme();

    useEffect(() => {
      (async () => {
        const fetchString = await firebase.getString(stringId);

        setString(fetchString);
        setHasFetched(true);
      })();
    }, []);

    if (!hasFetched) {
      return <Loading width="30px" />;
    }

    const navigateToStringPage = (): string => {
      if (inBoxPage) {
        return `string/${stringId}`;
      }
      return `/box/${string.associatedBox.id}/string/${stringId}`;
    };

    return (
      <StringCompactViewWrapper>
        <StringContext.Provider value={string}>
          <Link to={navigateToStringPage()} style={{ width: '100%' }}>
            <StringTitleWrapper>{string.title}</StringTitleWrapper>
          </Link>
          <MetaInfoWrapper>
            <AuthorWrapper>
              <p>started by</p>
              <StyledLink bold="normal" size="0.9em" highContrast>
                <Link to={`/profile/${string.author.id}`}>
                  {string.author.username}
                </Link>
              </StyledLink>
            </AuthorWrapper>

            {inFeedPage && (
              <BoxLinkWrapper>
                <p>posted in</p>
                <StyledLink bold="normal" size="0.9em" highContrast>
                  <Link to={`/box/${string.associatedBox.id}`}>
                    {string.associatedBox.name}
                  </Link>
                </StyledLink>
              </BoxLinkWrapper>
            )}

            <IconsWrapper>
              <StarNumberWrapper>
                <p>{string.hasStars ? string.starredUsers.length : 0}</p>
                <div>
                  <img
                    style={{ opacity: '0.6' }}
                    src={currentTheme.name === 'light' ? starDark : starLight}
                    alt="star"
                  />
                </div>
              </StarNumberWrapper>
              <KnotNumberWrapper>
                <p>{string.hasKnots ? string.associatedKnots.length : 0}</p>
                <div>
                  <img
                    style={{ opacity: '0.6' }}
                    src={
                      currentTheme.name === 'light' ? commentDark : commentLight
                    }
                    alt="comment-bubble"
                  />
                </div>
              </KnotNumberWrapper>
            </IconsWrapper>
          </MetaInfoWrapper>
        </StringContext.Provider>
      </StringCompactViewWrapper>
    );
  };

StringCompactView.defaultProps = {
  inBoxPage: false,
  inFeedPage: false,
};

export default StringCompactView;
