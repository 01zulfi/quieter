import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUser } from '../../context/UserContext';
import avatarManager from '../../utils/avatar-manager';
import firebase from '../../utils/firebase';
import Button from '../Button';
import Loading from '../Loading';

const AvatarsWrapper = styled.div``;

const ImageWrapper = styled.div`
  border-color: ${(props: any) => props.theme.aurora.four};
  border-radius: ${(props: any) => (props.greenBorder ? '5px' : '0px')};
  border-style: ${(props: any) => (props.greenBorder ? 'solid' : 'none')};
  display: flex;

  img {
    width: 1em;
    aspect-ratio: 1;
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
    return <Loading width="15px" />;
  }

  return (
    <section>
      <h2>Select your avatar!</h2>
      {isSubmitted ? (
        <h4>New avatar selected!</h4>
      ) : (
        <>
          <AvatarsWrapper onClick={onAvatarClick}>
            {avatars.map((avatar: any) => (
              <ImageWrapper greenBorder={avatar.isSelected} data-id={avatar.id}>
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
    </section>
  );
};

export default AvatarSelection;
