import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import avatarManager from '../../utils/avatar-manager';
import firebase from '../../utils/firebase';
import Loading from '../Loading';

const ImageWrapper = styled.img`
  height: ${(props: any) => props.height};
  aspect-ratio: 1;
  border: 1px solid ${(props: any) => props.theme.base.four};
  border-radius: 50%;

  &:hover {
    box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
    cursor: pointer;
  }
`;

interface AvatarProps {
  userId?: string;
  knotId?: string;
  height?: string;
}

const Avatar: FC<AvatarProps> = function Avatar({ userId, knotId, height }) {
  const [avatarId, setAvatarId] = useState('00');
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      let desiredUserId: string;

      if (knotId !== '') {
        const fetchKnot = await firebase.getKnot(knotId || '');
        if (fetchKnot) {
          desiredUserId = fetchKnot.author.id;
        } else {
          desiredUserId = '';
        }
      } else {
        desiredUserId = userId || '';
      }

      const fetchAvatarId = await firebase.getUserAvatarId(desiredUserId);
      setAvatarId(fetchAvatarId);
      setIsAvatarLoaded(true);
    })();
  }, [userId, knotId]);

  if (!isAvatarLoaded) return <Loading width="5px" />;

  return (
    <ImageWrapper
      alt="avatar"
      src={avatarManager.find(avatarId).src}
      height={height}
    />
  );
};

Avatar.defaultProps = {
  height: '2.5em',
  userId: '',
  knotId: '',
};

export default Avatar;
