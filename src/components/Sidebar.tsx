import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import StyledLink from './StyledLink';
import { useUserAnon } from '../context/UserContext';
import firebase from '../utils/firebase';
import BoxCreateModal from './Boxes/BoxCreateModal';
import Loading from './Loading';
import Button from './Button';

const SidebarWrapper = styled.section`
  background: ${(props: any) => props.theme.base.two};
  padding: 1em;
  gap: 1em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: baseline;
  height: fit-content;
`;

const Line = styled.div`
  height: 0.2em;
  width: 100%;
  background: ${(props: any) => props.theme.aurora.four};
`;

const Sidebar: FC = function Sidebar() {
  const [showBoxCreateModal, setShowBoxCreateModal] = useState(false);
  const [boxes, setBoxes] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const isUserAnon = useUserAnon();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const fetchData = await firebase.getBoxList();
      setBoxes(fetchData);
      setIsLoaded(true);
    })();
  }, []);

  const onCreateBoxClick = () => setShowBoxCreateModal(true);
  const onCloseModal = () => setShowBoxCreateModal(false);
  const onExploreButtonClick = () => {
    navigate('/explore');
  };

  return (
    <SidebarWrapper>
      <h3>Trending Boxes</h3>

      {isLoaded ? (
        <ol>
          {boxes.map((box: any) => (
            <li key={box.id}>
              <StyledLink bold="600" size="1.1em">
                <Link to={`/box/${box.id}`}>{box.name}</Link>
              </StyledLink>
            </li>
          ))}
        </ol>
      ) : (
        <Loading width="15px" />
      )}

      <Button
        type="button"
        status="secondary"
        textContent="Explore"
        padding="1em"
        clickHandler={onExploreButtonClick}
      />

      <Line />

      {!isUserAnon && (
        <Button
          type="button"
          status="primary"
          textContent="Create box"
          clickHandler={onCreateBoxClick}
        />
      )}

      {showBoxCreateModal && <BoxCreateModal closeModal={onCloseModal} />}
    </SidebarWrapper>
  );
};

export default Sidebar;
