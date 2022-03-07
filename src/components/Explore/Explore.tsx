import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUserAnon } from '../../context/UserContext';
import firebase from '../../utils/firebase';
import BoxCreateModal from '../Boxes/BoxCreateModal';
import Button from '../Button';
import Loading from '../Loading';
import ExploreItem from './ExploreItem';

const ExploreWrapper = styled.section`
  margin: 1em;
`;

const BoxWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
`;

const TitleAndButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;

  @media (max-width: 680px) {
    flex-direction: column;
    gap: 1em;
    justify-content: flex-start;
  }
`;

const HeadingWrapper = styled.h2`
  text-decoration: underline;
`;

const ItemWrapper = styled.div`
  width: 35%;

  @media (max-width: 680px) {
    width: 100%;
  }
`;

const Explore: FC = function Explore() {
  const [boxes, setBoxes] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBoxCreateModal, setShowBoxCreateModal] = useState(false);
  const isUserAnon = useUserAnon();

  useEffect(() => {
    (async () => {
      const fetchedData = await firebase.getBoxList(1000);
      setBoxes(fetchedData);
      setIsLoaded(true);
    })();
  }, []);

  const onCreateBoxClick = () => setShowBoxCreateModal(true);
  const onCloseModal = () => setShowBoxCreateModal(false);

  return (
    <ExploreWrapper>
      <TitleAndButtonWrapper>
        <HeadingWrapper>Explore all boxes on quieter here</HeadingWrapper>
        {!isUserAnon && (
          <Button
            textContent="Create box"
            clickHandler={onCreateBoxClick}
            status="primary"
            type="button"
          />
        )}
      </TitleAndButtonWrapper>

      <BoxWrapper>
        {isLoaded ? (
          boxes.map((box: any) => (
            <ItemWrapper key={box.id}>
              <ExploreItem
                boxName={box.name}
                boxDescription={box.description}
                boxId={box.id}
              />
            </ItemWrapper>
          ))
        ) : (
          <Loading width="30px" />
        )}
      </BoxWrapper>

      {showBoxCreateModal && <BoxCreateModal closeModal={onCloseModal} />}
    </ExploreWrapper>
  );
};

export default Explore;
