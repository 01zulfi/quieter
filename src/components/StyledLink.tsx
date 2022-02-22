import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: ${(props: any) => (props.black ? 'black' : props.theme.frost.three)};
  font-size: ${(props: any) => props.size};
  font-weight: ${(props: any) => props.bold};
  text-decoration: underline;
  padding: 3px;
  width: fit-content;

  &:hover {
    color: ${(props: any) => props.theme.text.one};
    text-decoration: none;
    background: ${(props: any) => props.theme.frost.four};
    border-radius: 5px;
  }
`;

interface StyledLinkInterface {
  size: string;
  bold: string;
  black?: boolean;
}

const StyledLink: FC<StyledLinkInterface> = function StyledLink({
  children,
  size,
  bold,
  black,
}) {
  return (
    <Wrapper size={size} bold={bold} black={black}>
      {children}
    </Wrapper>
  );
};

StyledLink.defaultProps = {
  black: false,
};

export default StyledLink;
