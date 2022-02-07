import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { useString } from '../../context/StringContext';
import firebase from '../../utils/firebase';

const StringEdit: FC = function StringEdit() {
  const string = useString() || {
    id: 'DEFAULT',
    title: 'DEFAULT',
    content: 'DEFAULT',
    associatedBox: 'DEFAULT',
  };
  const [title, setTitle] = useState(string.title);
  const [content, setContent] = useState(string.content);
  const navigate = useNavigate();

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await firebase.editString({ stringId: string.id, title, content });
    navigate(`box/${string.associatedBox}/string/{string.id}`);
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          name="string-edit-input"
          value={title}
          onChange={onTitleChange}
        />
        <textarea value={content} onChange={onContentChange} />
        <Button
          type="submit"
          textContent="Submit changes"
          clickHandler={() => {}}
        />
      </form>
    </div>
  );
};

export default StringEdit;
