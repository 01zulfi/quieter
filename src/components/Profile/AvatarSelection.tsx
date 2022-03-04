import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUser } from '../../context/UserContext';
import avatarManager from '../../utils/avatar-manager';
import firebase from '../../utils/firebase';
import Button from '../Button';
import Loading from '../Loading';

const AvatarSelectionWrapper = styled.section`
  background: ${(props: any) => props.theme.base.two};
  border-radius: 5px;
  padding: 1em;
  width: 85vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1em;
`;

const AvatarsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  border-radius: 4px;
  border-color: ${(props: any) => props.theme.aurora.four};
  border-width: ${(props: any) => (props.greenBorder ? '5px' : '0px')};
  border-style: ${(props: any) => (props.greenBorder ? 'solid' : 'none')};
  display: flex;
  width: fit-content;

  img {
    width: 4em;
    aspect-ratio: 1;
  }

  &:hover {
    outline: 1px solid ${(props: any) => props.theme.aurora.four};
  }
`;

const AvatarSelection: FC = function AvatarSelection() {
  const [avatars, setAvatars] = useState<any>(avatarManager.avatars);
  const [selectedAvatarId, setSelectedAvatarId] = useState('00');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  useEffect(() => {
    (async () => {
      const fetchAvatarId = await firebase.getUserAvatarId(user.id);
      avatarManager.setIsSelectedTrue(fetchAvatarId);
      setSelectedAvatarId(fetchAvatarId);
      setAvatars(avatarManager.avatars);
    })();
  }, []);

  const onAvatarClick = (event: any) => {
    const avatarId = event.target.getAttribute('data-id');
    avatarManager.setIsSelectedTrue(avatarId);
    setSelectedAvatarId(avatarId);
    setAvatars(avatarManager.avatars);
  };

  const onSelect = async () => {
    setIsLoading(true);
    await firebase.setUserAvatarId(selectedAvatarId);
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isLoading) {
    return (
      <AvatarSelectionWrapper>
        <h2>Select your avatar!</h2>
        <Loading width="15px" />
      </AvatarSelectionWrapper>
    );
  }

  return (
    <AvatarSelectionWrapper>
      <h2>Select your avatar!</h2>
      {isSubmitted ? (
        <h4>New avatar selected!</h4>
      ) : (
        <>
          <AvatarsWrapper>
            {avatars.map((avatar: any) => (
              <ImageWrapper
                onClick={onAvatarClick}
                greenBorder={avatar.isSelected}
                data-id={avatar.id}
              >
                <img src={avatar.src} alt="avatar" data-id={avatar.id} />
              </ImageWrapper>
            ))}
          </AvatarsWrapper>

          <Button
            textContent="Select"
            type="button"
            clickHandler={onSelect}
            status="primary"
          />
        </>
      )}
    </AvatarSelectionWrapper>
  );
};

export default AvatarSelection;
