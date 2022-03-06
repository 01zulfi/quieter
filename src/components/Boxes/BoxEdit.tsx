import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useBox } from '../../context/BoxContext';
import firebase from '../../utils/firebase';
import Button from '../Button';
import Loading from '../Loading';

const BoxEditWrapper = styled.section`
  margin: 1em;
  border-radius: 10px;
  box-shadow: rgb(36 41 51 / 15%) 0px 5px 10px 0px;
  background: ${(props: any) => props.theme.base.three};
  padding: 1em 1em;

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
  }
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4em;
  }
  input {
    background: ${(props: any) => props.theme.frost.one};
    border: 0;
    border: 1px solid ${(props: any) => props.theme.frost.four};
    font-weight: normal;
    border-radius: 5px;
    padding: 0.6em;
    font-size: 1.1em;
    &:focus {
      outline: 2px solid ${(props: any) => props.theme.text.four};
    }
  }
`;

interface BoxEditInterface {
  closeModal: any;
}

const BoxEdit: FC<BoxEditInterface> = function BoxEdit({ closeModal }) {
  const box = useBox() || {
    id: 'DEFAULT',
    name: 'DEFAULT',
    description: 'DEFAULT',
  };
  const [name, setName] = useState(box.name);
  const [description, setDescription] = useState(box.description);
  const [isLoading, setIsLoading] = useState(false);

  if (box.id === 'DEFAULT') {
    return <h4>Unable to load, try refreshing.</h4>;
  }

  const onNameEdit = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const onDescriptionEdit = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const onFinishEditing = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    await firebase.editBox({ boxId: box.id, name, description });

    setIsLoading(false);
    closeModal();
  };

  return (
    <BoxEditWrapper>
      <form onSubmit={onFinishEditing}>
        <label htmlFor="box-name-input">
          What is this box called?
          <input
            type="text"
            id="box-name-edit"
            placeholder="enter box's name here"
            value={name}
            onChange={onNameEdit}
            required
            maxLength={25}
          />
        </label>
        <label htmlFor="box-description-input">
          Describe this box:
          <input
            type="text"
            id="box-description-edit"
            placeholder="description goes here"
            value={description}
            onChange={onDescriptionEdit}
            required
            maxLength={70}
          />
        </label>
        {isLoading ? (
          <Loading width="15px" />
        ) : (
          <Button
            type="submit"
            status="secondary"
            textContent="Edit box"
            clickHandler={() => {}}
          />
        )}
      </form>
    </BoxEditWrapper>
  );
};

export default BoxEdit;
