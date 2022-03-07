import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useBox } from '../../context/BoxContext';
import StyledLink from '../StyledLink';
import Loading from '../Loading';
import firebase from '../../utils/firebase';
import uniqueId from '../../utils/unique-id';
import Button from '../Button';

const StringCreateFormWrapper = styled.section`
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
  input,
  textarea {
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
  textarea {
    height: fit-content;
  }
`;

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StringCreateForm: FC = function StringCreateForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [stringId, setStringId] = useState('');
  const box = useBox() || { id: 'DEFAULT', name: 'DEFAULT' };

  useEffect(() => {
    setStringId(uniqueId());
  }, []);

  const onTitleInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const onContentInput = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    await firebase.createString({
      boxName: box.name,
      boxId: box.id,
      title,
      content,
      stringId,
    });
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <StringCreateFormWrapper>
      {isSubmitted ? (
        <SuccessWrapper>
          <h2>Success! Your string has started.</h2>
          <StyledLink bold="600" size="1.2em">
            <Link to={`/box/${box.id}/string/${stringId}`}>view it here</Link>
          </StyledLink>
        </SuccessWrapper>
      ) : (
        <form onSubmit={submitHandler}>
          <label htmlFor="string-title-input">
            Title: (max: 100 characters)
            <input
              type="text"
              id="string-title-input"
              onChange={onTitleInput}
              placeholder="give a title to your string"
              required
              maxLength={100}
            />
          </label>

          <label htmlFor="string-content-input">
            Content: (max: 1000 characters)
            <textarea
              name="string-content-input"
              id="string-content-input"
              cols={30}
              rows={10}
              placeholder="populate your string with content by writing something here"
              onChange={onContentInput}
              required
              maxLength={1000}
            />
          </label>

          {isLoading ? (
            <Loading width="20px" />
          ) : (
            <Button
              status="primary"
              textContent="Start String"
              type="submit"
              clickHandler={() => {}}
            />
          )}
        </form>
      )}
    </StringCreateFormWrapper>
  );
};

export default StringCreateForm;
