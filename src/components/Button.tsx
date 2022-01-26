import React, { FC } from 'react';

interface ButtonProps {
  type: string;
  textContent: string;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = function Button({
  type,
  textContent,
  clickHandler,
}) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={clickHandler}
    >
      {textContent}
    </button>
  );
};

export default Button;
