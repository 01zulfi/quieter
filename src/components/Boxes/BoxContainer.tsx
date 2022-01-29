import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import BoxContext from '../../context/BoxContext';
import BoxAdminView from './BoxAdminView';
import BoxRegularView from './BoxRegularView';
import Button from '../Button';

const BoxContainer: FC = function BoxContainer() {
  const params = useParams();
  const [box, setBox] = useState<any>({});
  const [showStringCreateModal, setShowStringCreateModal] = useState(false);
  const user = useUser();

  useEffect(() => {
    (async () => {
      const fetchBox = await firebase.getBox(params.boxId);
      setBox(fetchBox);
    })();
  }, []);

  const isCurrentUserAdmin = user.adminBoxes.some(
    (id: string) => id === params.boxId,
  );

  const onCreateStringClick = (): void => setShowStringCreateModal(true);

  const onCloseModal = (): void => setShowStringCreateModal(false);

  return (
    <div>
      <BoxContext.Provider value={box}>
        {isCurrentUserAdmin && <BoxAdminView />}
        <BoxRegularView onButtonClick={onCreateStringClick} />
        {showStringCreateModal && (
          <StringCreateModal closeModal={onCloseModal} />
        )}
        <Button
          type="button"
          textContent="Start a string here"
          clickHandler={() => {}}
        />
      </BoxContext.Provider>
    </div>
  );
};

export default BoxContainer;
