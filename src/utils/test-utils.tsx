import { render } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import theme from './themes';

declare module 'styled-components';

const Provider: FC = function Provider({ children }) {
  return <ThemeProvider theme={theme.light}>{children}</ThemeProvider>;
};

const customRender = (component: ReactElement) =>
  render(component, { wrapper: Provider });

export * from '@testing-library/react';
export { customRender as render };
