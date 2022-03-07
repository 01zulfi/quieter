import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import firebase from '../../utils/firebase';
import StyledLink from '../StyledLink';
import uniqueId from '../../utils/unique-id';
import Button from '../Button';
import Loading from '../Loading';

const BoxCreateFormWrapper = styled.section`
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
  }
  input {
    background: ${(props: any) => props.theme.frost.one};
    border: 0;
    border: 1px solid ${(props: any) => props.theme.frost.four};
    font-weight: normal;
    border-radius: 5px;
    padding: 1em;
    font-size: 1.1em;
    &:focus {
      outline: 2px solid ${(props: any) => props.theme.text.four};
    }
  }
`;

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxCreateForm: FC = function BoxCreateForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [boxId, setBoxId] = useState('');

  useEffect(() => {
    setBoxId(uniqueId());
  }, []);

  const onNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const onDescriptionInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    await firebase.createBox({ name, description, boxId });
    setIsSubmitted(true);

    setIsLoading(false);
  };

  return (
    <BoxCreateFormWrapper>
      {isSubmitted ? (
        <SuccessWrapper>
          <h1>Success! The box has been created.</h1>

          <StyledLink bold="600" size="1.2em">
            <Link to={`/box/${boxId}`}>view it here</Link>
          </StyledLink>
        </SuccessWrapper>
      ) : (
        <form onSubmit={submitHandler}>
          <label htmlFor="box-name-input">
            What is this box called?
            <input
              type="text"
              id="box-name-input"
              placeholder="enter box's name here"
              onChange={onNameInput}
              required
              maxLength={25}
            />
          </label>
          <label htmlFor="box-description-input">
            Describe this box:
            <input
              type="text"
              id="box-description-input"
              placeholder="description goes here"
              required
              maxLength={70}
              onChange={onDescriptionInput}
            />
          </label>
          {isLoading ? (
            <Loading width="25px" />
          ) : (
            <Button
              textContent="Create box"
              type="submit"
              clickHandler={() => {}}
              status="primary"
            />
          )}
        </form>
      )}
    </BoxCreateFormWrapper>
  );
};

export default BoxCreateForm;
