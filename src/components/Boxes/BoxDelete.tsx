import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useBox } from '../../context/BoxContext';
import firebase from '../../utils/firebase';
import Button from '../Button';

const BoxDeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  margin: 1em;
  border-radius: 10px;
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
  background: ${(props: any) => props.theme.base.three};
`;

const BoxDelete: FC = function BoxDelete() {
  const box = useBox() || { id: 'DEFAULT' };
  const navigate = useNavigate();

  if (box.id === 'DEFAULT') {
    return <h4>Unable to load, try refreshing.</h4>;
  }

  const onBoxDelete = async () => {
    await firebase.deleteBox(box.id);
    navigate('../../../../');
  };

  return (
    <BoxDeleteWrapper>
      <h2>Are you sure?</h2>
      <p>
        <strong>
          Deleting this box will delete all the strings and knots associated
          with it.
        </strong>
      </p>
      <Button
        type="submit"
        textContent="Delete box"
        status="red"
        clickHandler={onBoxDelete}
      />
    </BoxDeleteWrapper>
  );
};

export default BoxDelete;
