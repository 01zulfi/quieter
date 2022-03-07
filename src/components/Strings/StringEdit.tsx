import React, { FC, useState } from 'react';
import styled from 'styled-components/macro';
import Button from '../Button';
import { useString } from '../../context/StringContext';
import firebase from '../../utils/firebase';
import Loading from '../Loading';

const StringEditWrapper = styled.section`
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

interface StringEditProps {
  closeModal: any;
}

const StringEdit: FC<StringEditProps> = function StringEdit({ closeModal }) {
  const string = useString() || {
    id: 'DEFAULT',
    title: 'DEFAULT',
    content: 'DEFAULT',
    associatedBox: { id: 'DEFAULT' },
  };
  const [title, setTitle] = useState(string.title);
  const [content, setContent] = useState(string.content);
  const [isLoading, setIsLoading] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    await firebase.editString({ stringId: string.id, title, content });
    setIsLoading(false);
    closeModal();
  };

  if (string.id === 'DEFAULT') {
    return <h4>Unable to load, try refreshing.</h4>;
  }

  return (
    <StringEditWrapper>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="string-edit-input">
          Title: (max: 100 characters)
          <input
            type="text"
            name="string-edit-input"
            id="string-edit-input"
            value={title}
            onChange={onTitleChange}
            required
            maxLength={100}
          />
        </label>
        <label htmlFor="string-content-edit">
          Content: (max: 1000 characters)
          <textarea
            value={content}
            onChange={onContentChange}
            id="string-content-input"
            required
            maxLength={1000}
          />
        </label>
        {isLoading ? (
          <Loading width="20px" />
        ) : (
          <Button
            type="submit"
            status="secondary"
            textContent="Submit changes"
            clickHandler={() => {}}
          />
        )}
      </form>
    </StringEditWrapper>
  );
};

export default StringEdit;
