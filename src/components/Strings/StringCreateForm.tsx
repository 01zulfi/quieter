import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBox } from '../../context/BoxContext';
import firebase from '../../utils/firebase';
import uniqueId from '../../utils/unique-id';
import Button from '../Button';

const StringCreateForm: FC = function StringCreateForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const box = useBox() || { id: 'DEFAULT', name: 'DEFAULT' };

  const stringId = uniqueId();

  const onTitleInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const onContentInput = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await firebase.createString({
      boxName: box.name,
      boxId: box.id,
      title,
      content,
      stringId,
    });
    setIsSubmitted(true);
  };

  return (
    <div>
      {isSubmitted ? (
        <div>
          <h1>Success! Your string has started.</h1>
          <Link to={`/box/${box.id}/string/${stringId}`}>view it here</Link>
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            onChange={onTitleInput}
            placeholder="give a title to your string"
          />
          <textarea
            name="string-content-input"
            id="string-content-input"
            cols={30}
            rows={10}
            placeholder="populate your string with content by writing something here"
            onChange={onContentInput}
          />
          <Button
            textContent="Start String"
            type="submit"
            clickHandler={() => {}}
          />
        </form>
      )}
    </div>
  );
};

export default StringCreateForm;
