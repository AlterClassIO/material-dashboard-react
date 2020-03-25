import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
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
      <Router>
        <Route path="/" component={Admin} />
        <Redirect from="/" to="/dashboard" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
