import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useUserAnon } from '../context/UserContext';
import BoxCreateModal from './Boxes/BoxCreateModal';
import Button from './Button';

const SidebarWrapper = styled.section`
  width: 100%;
  background: ${(props: any) => props.theme.base.two}
  padding: 1em;
  border-radius: 10px;
  display: flex;
  flex-direction:column;

  @media (min-width: 800px) {
    width: 5rem;
  }
`;

const Sidebar: FC = function Sidebar() {
  const [showBoxCreateModal, setShowBoxCreateModal] = useState(false);
  const isUserAnon = useUserAnon();

  const onCreateBoxClick = () => setShowBoxCreateModal(true);
  const onCloseModal = () => setShowBoxCreateModal(false);

  return (
    <SidebarWrapper>
      <div>
        <h3>Explore Boxes</h3>
        {!isUserAnon && (
          <Button
            type="button"
            status="secondary"
            textContent="Create box"
            clickHandler={onCreateBoxClick}
          />
        )}
      </div>

      {showBoxCreateModal && <BoxCreateModal closeModal={onCloseModal} />}
    </SidebarWrapper>
  );
};

export default Sidebar;
