import React, { FC } from 'react';
import styled from 'styled-components/macro';
import {
  backgroundDecider,
  colorDecider,
  outlineDecider,
  hoverBackgroundDecider,
  hoverColorDecider,
  hoverOutlineDecider,
} from '../utils/button-style-deciders';

/* eslint-disable indent */
const ButtonWrapper = styled.button`
  background: ${(props: any) => backgroundDecider(props.status, props.theme)};
  color: ${(props: any) => colorDecider(props.status, props.theme)};
  font-size: 1rem;
  border: 0;
  outline: ${(props: any) => outlineDecider(props.status, props.theme)};
  padding: ${(props: any) => props.padding};
  border-radius: 5px;

  &:hover {
    background: ${(props: any) =>
      hoverBackgroundDecider(props.status, props.theme)};
    color: ${(props: any) => hoverColorDecider(props.status, props.theme)};
    outline: ${(props: any) => hoverOutlineDecider(props.status, props.theme)};
    cursor: pointer;
  }

  &:focus {
    outline: 2px solid black;
  }
`;

interface ButtonProps {
  type: string;
  textContent: string;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
  status: string;
  padding?: string;
}

const Button: FC<ButtonProps> = function Button({
  type,
  textContent,
  clickHandler,
  status,
  padding,
}) {
  return (
    <ButtonWrapper
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={clickHandler}
      status={status}
      padding={padding}
    >
      {textContent}
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  padding: '1rem',
};

export default Button;
