import React from 'react';
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { main } from './themes';
// @material-ui/core components
import CssBaseline from '@material-ui/core/CssBaseline';
// core layouts
import Admin from './layouts/Admin';

export const GlobalStyles = createGlobalStyle`...`;

function App() {
  return (
    <ThemeProvider theme={main}>
      <CssBaseline />
      <GlobalStyles />
      <Admin />
    </ThemeProvider>
  );
}

export default App;
