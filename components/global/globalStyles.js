// @flow
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    margin: 0;
    min-height: 100%;
    position: relative;
  }
`;

export default GlobalStyle;