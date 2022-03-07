import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components/macro';
import linkColorDecider from '../utils/link-color-decider';

const Wrapper = styled.div`
  color: ${(props: any) => props.color};
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
  highContrast?: boolean;
}

const StyledLink: FC<StyledLinkInterface> = function StyledLink({
  children,
  size,
  bold,
  highContrast,
}) {
  const currentTheme = useTheme();
  return (
    <Wrapper
      size={size}
      bold={bold}
      color={linkColorDecider(currentTheme, highContrast)}
    >
      {children}
    </Wrapper>
  );
};

StyledLink.defaultProps = {
  highContrast: false,
};

export default StyledLink;
