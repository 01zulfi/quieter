import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../utils/firebase';
import uniqueId from '../../utils/unique-id';
import Button from '../Button';

const BoxCreateForm: FC = function BoxCreateForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const boxId = uniqueId();

  const onNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const onDescriptionInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await firebase.createBox({ name, description, boxId });
    setIsSubmitted(true);
  };

  return (
    <div>
      {isSubmitted ? (
        <div>
          <h1>Success! The box has been created.</h1>
          <Link to={`/box/${boxId}`}>view it here</Link>
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <label htmlFor="box-name-input">
            What is this box called?
            <input
              type="text"
              id="box-name-input"
              placeholder="enter box's name here"
              onChange={onNameInput}
            />
          </label>
          <label htmlFor="box-description-input">
            Describe this box:
            <input
              type="text"
              id="box-description-input"
              placeholder="description goes here"
              onChange={onDescriptionInput}
            />
          </label>
          <Button
            textContent="Create box"
            type="submit"
            clickHandler={() => {}}
          />
        </form>
      )}
    </div>
  );
};

export default BoxCreateForm;
