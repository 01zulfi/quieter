import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: ${(props: any) => props.theme.frost.three};
  font-size: ${(props: any) => props.size};
  font-weight: ${(props: any) => props.bold};
  text-decoration: underline;
  padding: 3px;

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
}

const StyledLink: FC<StyledLinkInterface> = function StyledLink({
  children,
  size,
  bold,
}) {
  return (
    <Wrapper size={size} bold={bold}>
      {children}
    </Wrapper>
  );
};

export default StyledLink;
