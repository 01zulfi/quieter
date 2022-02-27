import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useUser, useUserAnon } from '../../context/UserContext';
import firebase from '../../utils/firebase';
import BoxContext from '../../context/BoxContext';
import BoxAdminView from './BoxAdminView';
import BoxRegularView from './BoxRegularView';
import StringCreateModal from '../Strings/StringCreateModal';
import StringCompactView from '../Strings/StringCompactView';
import Loading from '../Loading';

const BoxContainerWrapper = styled.section`
  width: 80%;

  @media (max-width: 680px) {
    width: 100%;
  }
`;

const MetaWrapper = styled.section`
  background: ${(props: any) => props.theme.base.two};
  border-radius: 10px;
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
  padding: 1em;
  width: 100%;
`;

const BoxContainer: FC = function BoxContainer() {
  const params = useParams();
  const [box, setBox] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [showStringCreateModal, setShowStringCreateModal] = useState(false);
  const [isCurrentUserMember, setIsCurrentUserMember] = useState(false);
  const user = useUser();
  const isUserAnon = useUserAnon();

  useEffect(() => {
    (async () => {
      const fetchBox = await firebase.getBox(params.boxId || '');
      setBox(fetchBox);
      setIsLoaded(true);
    })();

    const listener = firebase.listenForBoxChanges(params.boxId || '');
    const unsubscribe = listener(setBox);
    return unsubscribe();
  }, []);

  useEffect(() => {
    if (isUserAnon) return;
    const isUserMember = user?.joinedBoxes.some(
      (id: string) => id === params.boxId,
    );

    setIsCurrentUserMember(isUserMember);
  });

  if (!isLoaded) return <Loading width="50px" />;
  if (box === null) {
    return <h2>we couldn&apos;t find what you&apos;re looking for</h2>;
  }

  const isCurrentUserAdmin = !isUserAnon
    ? user.adminBoxes.some((id: string) => id === params.boxId)
    : !isUserAnon;

  const onCreateStringClick = (): void => setShowStringCreateModal(true);

  const onCloseModal = (): void => setShowStringCreateModal(false);

  return (
    <BoxContainerWrapper>
      <BoxContext.Provider value={box}>
        <MetaWrapper>
          {isCurrentUserAdmin && <BoxAdminView />}

          <BoxRegularView
            onButtonClick={onCreateStringClick}
            isCurrentUserAdmin={isCurrentUserAdmin}
            isCurrentUserMember={isCurrentUserMember}
          />

          {!isUserAnon && showStringCreateModal && (
            <StringCreateModal closeModal={onCloseModal} />
          )}
        </MetaWrapper>

        {box.hasStrings ? (
          <section>
            {box.associatedStrings.map((stringId: string) => (
              <div key={stringId}>
                <StringCompactView stringId={stringId} inBoxPage />
              </div>
            ))}
          </section>
        ) : (
          <div>this box has no strings</div>
        )}
      </BoxContext.Provider>
    </BoxContainerWrapper>
  );
};

export default BoxContainer;
