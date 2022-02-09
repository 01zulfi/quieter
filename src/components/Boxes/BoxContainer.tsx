import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser, useSetUser, useUserAnon } from '../../context/UserContext';
import firebase from '../../utils/firebase';
import BoxContext from '../../context/BoxContext';
import BoxAdminView from './BoxAdminView';
import BoxRegularView from './BoxRegularView';
import StringCreateModal from '../Strings/StringCreateModal';
import StringCompactView from '../Strings/StringCompactView';
import Button from '../Button';
import Loading from '../Loading';

const BoxContainer: FC = function BoxContainer() {
  const params = useParams();
  const [box, setBox] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [showStringCreateModal, setShowStringCreateModal] = useState(false);
  const [isCurrentUserMember, setIsCurrentUserMember] = useState(false);
  const user = useUser() || { joinedBoxes: [], adminBoxes: [] };
  const isUserAnon = useUserAnon();

  useEffect(() => {
    (async () => {
      const fetchBox = await firebase.getBox(params.boxId || '');
      setBox(fetchBox);
      setIsLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (isUserAnon) return;
    const isUserMember = user?.joinedBoxes.some(
      (id: string) => id === params.boxId,
    );

    setIsCurrentUserMember(isUserMember);
  });

  if (!isLoaded) return <Loading />;

  const isCurrentUserAdmin =
    !isUserAnon && user.adminBoxes.some((id: string) => id === params.boxId);

  const onCreateStringClick = (): void => setShowStringCreateModal(true);

  const onJoinButtonClick = async () => {
    await firebase.joinBox(params.boxId || '');
    useSetUser()();
  };

  const onLeaveButtonClick = async () => {
    await firebase.leaveBox(params.boxId || '');
    useSetUser()();
  };

  const onCloseModal = (): void => setShowStringCreateModal(false);

  return (
    <div>
      <BoxContext.Provider value={box}>
        {isCurrentUserAdmin && <BoxAdminView />}

        <BoxRegularView onButtonClick={onCreateStringClick} />

        {isCurrentUserMember ? (
          <Button
            type="button"
            textContent="Leave box"
            clickHandler={onLeaveButtonClick}
          />
        ) : (
          <Button
            textContent="Join Box"
            type="button"
            clickHandler={isUserAnon ? () => {} : onJoinButtonClick}
          />
        )}

        {!isUserAnon && showStringCreateModal && (
          <StringCreateModal closeModal={onCloseModal} />
        )}

        {box.associatedStrings.length > 0 ? (
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
