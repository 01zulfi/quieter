import React, { FC, useState } from 'react';
import styled from 'styled-components/macro';
import Button from '../Button';
import { useBox } from '../../context/BoxContext';
import firebase from '../../utils/firebase';
import { useUserAnon } from '../../context/UserContext';
import Loading from '../Loading';

const BoxRegularViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;
`;

const BoxNameWrapper = styled.h2`
  text-align: start;
  margin-top: 0.5em;
`;

const DescAndButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    background: ${(props: any) => props.theme.base.three};
    padding: 0.3em;
  }
`;

const Line = styled.div`
  background: ${(props: any) => props.theme.base.four};
  width: 100%;
  height: 0.3em;
  margin: 1em 0em;
`;

interface BoxRegularViewProps {
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  isCurrentUserAdmin: boolean;
  isCurrentUserMember: boolean;
}

const BoxRegularView: FC<BoxRegularViewProps> = function BoxRegularView({
  onButtonClick,
  isCurrentUserAdmin,
  isCurrentUserMember,
}) {
  const [isButtonLoaded, setIsButtonLoaded] = useState(true);
  const box = useBox() || {
    id: 'DEFAULT',
    name: '',
    description: '',
    joinedUsersCount: 0,
  };
  const isUserAnon = useUserAnon();

  if (box.id === 'DEFAULT') {
    return <h4>Unable to load, please try refreshing.</h4>;
  }

  const onJoinButtonClick = async () => {
    setIsButtonLoaded(false);
    await firebase.joinBox(box.id);
    setIsButtonLoaded(true);
  };

  const onLeaveButtonClick = async () => {
    setIsButtonLoaded(false);
    await firebase.leaveBox(box.id);
    setIsButtonLoaded(true);
  };

  return (
    <BoxRegularViewWrapper>
      <BoxNameWrapper>{box.name}</BoxNameWrapper>

      <DescAndButtonWrapper>
        <p>{box.description}</p>

        {isButtonLoaded ? (
          <div>
            {!isCurrentUserAdmin && (
              <div>
                {isCurrentUserMember ? (
                  <Button
                    type="button"
                    textContent="Leave Box"
                    clickHandler={onLeaveButtonClick}
                    status="orange"
                    padding="0.9em"
                  />
                ) : (
                  <Button
                    textContent="Join Box"
                    type="button"
                    clickHandler={isUserAnon ? () => {} : onJoinButtonClick}
                    status="purple"
                    padding="0.9em"
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <Loading width="15px" />
        )}
      </DescAndButtonWrapper>

      <p style={{ opacity: '0.8' }}>{`${box.joinedUsersCount} members`}</p>

      <Line />

      <Button
        status="secondary"
        padding="1em"
        type="button"
        textContent={`Start a string in ${box.name}`}
        clickHandler={isUserAnon ? () => {} : onButtonClick}
      />
    </BoxRegularViewWrapper>
  );
};

export default BoxRegularView;
