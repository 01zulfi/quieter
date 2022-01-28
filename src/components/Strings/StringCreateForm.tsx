import React, { FC, useState } from 'react';
import Button from '../Button';

const StringCreateForm: FC = function StringCreateForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  // TODO: use firebase to createString
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const onContentInput = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  // TODO: add link to string route
  return (
    <div>
      {isSubmitted ? (
        <div>
          <h1>Success! Your string has started.</h1>
          <p>view it here</p>
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
