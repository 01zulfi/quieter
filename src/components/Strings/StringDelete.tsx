import React, { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import firebase from '../../utils/firebase';
import { useString } from '../../context/StringContext';
import Button from '../Button';

const StringDeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  margin: 1em;
  border-radius: 10px;
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
  background: ${(props: any) => props.theme.base.three};
`;

const StringDelete: FC = function StringDelete() {
  const string = useString() || {
    id: 'DEFAULT',
    associatedBox: { id: 'DEFAULT' },
  };
  const navigate = useNavigate();

  const onBoxDelete = async () => {
    await firebase.deleteString(string.id);
    navigate(`../../../../box/${string.associatedBox.id}`);
  };

  if (string.id === 'DEFAULT') {
    return <h4>Unable to load, try refreshing.</h4>;
  }

  return (
    <StringDeleteWrapper>
      <h3>Are you sure?</h3>
      <p>
        <strong>
          Deleting this string will also delete all the knots that were tied to
          it.
        </strong>
      </p>
      <Button
        type="submit"
        status="red"
        textContent="Delete String"
        clickHandler={onBoxDelete}
      />
    </StringDeleteWrapper>
  );
};

export default StringDelete;
