import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import BoxContext from '../../context/BoxContext';
import BoxAdminView from './BoxAdminView';
import BoxRegularView from './BoxRegularView';
import StringCreateModal from '../Strings/StringCreateModal';
import StringCompactView from '../Strings/StringCompactView';
import Button from '../Button';

const BoxContainer: FC = function BoxContainer() {
  const params = useParams();
  const [box, setBox] = useState<any>({});
  const [hasStrings, setHasStrings] = useState(false);
  const [showStringCreateModal, setShowStringCreateModal] = useState(false);
  const user = useUser();

  useEffect(() => {
    (async () => {
      const fetchBox = await firebase.getBox(params.boxId);
      setBox(fetchBox);
      setHasStrings(fetchBox.hasStrings);
    })();
  }, []);

  const isCurrentUserAdmin = user.adminBoxes.some(
    (id: string) => id === params.boxId,
  );

  const isUserMember = user.joinedBoxes.some(
    (id: string) => id === params.boxId,
  );

  const onCreateStringClick = (): void => setShowStringCreateModal(true);

  const onJoinButtonClick = async () => await firebase.joinBox(params.boxId);
  const onLeaveButtonClick = async () => await firebase.leaveBox(params.boxId);

  const onCloseModal = (): void => setShowStringCreateModal(false);

  return (
    <div>
      <BoxContext.Provider value={box}>
        {isCurrentUserAdmin && <BoxAdminView />}

        <BoxRegularView onButtonClick={onCreateStringClick} />

        {isUserMember ? (
          <Button
            type="button"
            textContent="Leave box"
            clickHandler={onLeaveButtonClick}
          />
        ) : (
          <Button
            textContent="Join Box"
            type="button"
            clickHandler={onJoinButtonClick}
          />
        )}

        {showStringCreateModal && (
          <StringCreateModal closeModal={onCloseModal} />
        )}

        {hasStrings ? (
          <section>
            {box.associatedStrings.map((stringId: string) => (
              <div key={stringId}>
                <StringCompactView stringId={stringId} />
              </div>
            ))}
          </section>
        ) : (
          <div>this box has no strings</div>
        )}
      </BoxContext.Provider>
    </div>
  );
};

export default BoxContainer;
