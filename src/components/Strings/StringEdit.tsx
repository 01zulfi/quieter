import React, { FC, useState } from 'react';
import Button from '../Button';
import { useString } from '../../context/StringContext';
import firebase from '../../utils/firebase';

const StringEdit: FC = function StringEdit() {
  const string = useString();
  const [title, setTitle] = useState(string.title);
  const [content, setContent] = useState(string.content);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: navigate to string route after updating
    await firebase.updateString(string.id, { title, content });
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
