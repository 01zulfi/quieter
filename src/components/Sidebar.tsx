import React, { FC, useState } from 'react';
import { useUserAnon } from '../context/UserContext';
import BoxCreateModal from './Boxes/BoxCreateModal';
import Button from './Button';

const Sidebar: FC = function Sidebar() {
  const [showBoxCreateModal, setShowBoxCreateModal] = useState(false);
  const isUserAnon = useUserAnon();

  const onCreateBoxClick = () => setShowBoxCreateModal(true);
  const onCloseModal = () => setShowBoxCreateModal(false);

  return (
    <section>
      <div>
        <h3>Explore Boxes</h3>
        {!isUserAnon && (
          <Button
            type="button"
            textContent="Create box"
            clickHandler={onCreateBoxClick}
          />
        )}
      </div>

      {showBoxCreateModal && <BoxCreateModal closeModal={onCloseModal} />}
    </section>
  );
};

export default Sidebar;
