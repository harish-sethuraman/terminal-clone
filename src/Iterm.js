import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { themes, GlobalStyle } from 'Components/themecontext';
import App from 'Components/App';

const Iterm = () => (
  <Router>
    <ThemeProvider theme={themes.dark}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Router>
);

export default Iterm;
