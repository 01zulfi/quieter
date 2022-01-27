import React, { FC, useState } from 'react';
import Button from '../Button';

const StringCreateForm: FC = function StringCreateForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [content, setContent] = useState(''); // TODO: use firebase for content

  const inputHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      {isSubmitted ? (
        <div>
          <h1>Success! Your string has started.</h1>
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <textarea
            name="string-input"
            id="string-input"
            cols={30}
            rows={10}
            placeholder="start a string by writing something here"
            onChange={inputHandler}
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
