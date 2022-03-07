import React, { FC } from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.section`
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    background: ${(props: any) => props.theme.aurora.four};
    border: 0;
    border-radius: 5px;
    padding: 0.3em;
    font-size: 1.1em;
    &:focus {
      outline: 2px solid ${(props: any) => props.theme.text.four};
    }
    &::placeholder {
      color: black;
      font-size: 1em;
      opacity: 0.5;
    }
  }
`;

const EmailFormWrapper: FC = function EmailFormWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
};

export default EmailFormWrapper;
