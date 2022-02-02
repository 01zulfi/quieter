import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBox } from '../../context/BoxContext';
import firebase from '../../utils/firebase';
import Button from '../Button';

const BoxEdit: FC = function BoxEdit() {
  const box = useBox();
  const [name, setName] = useState(box.name);
  const [description, setDescription] = useState(box.description);
  const navigate = useNavigate();

  const onNameEdit = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const onDescriptionEdit = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const onFinishEditing = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await firebase.editBox({ boxId: box.id, name, description });
    navigate(`/box/${box.id}`);
  };

  return (
    <div>
      <form onSubmit={onFinishEditing}>
        <label htmlFor="box-name-input">
          What is this box called?
          <input
            type="text"
            id="box-name-edit"
            placeholder="enter box's name here"
            value={name}
            onChange={onNameEdit}
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
          />
        </label>
        <Button type="submit" textContent="Edit box" clickHandler={() => {}} />
      </form>
    </div>
  );
};

export default BoxEdit;
