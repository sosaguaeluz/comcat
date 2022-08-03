import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider as StyledThemeProvider} from 'styled-components';
import { ThemeProvider as MuiThemeProvider} from '@mui/material';
import App from './App';
import GlobalStyle from './components/style/GlobalStyle';
import colors from './components/style/theme/colors';
import { Provider } from 'react-redux';
import { Store } from './stores';
import { createTheme } from '@mui/material';

const BreakpointOverrides = createTheme({
  breakpoints: {
    values: {
      xs: 600,
      sm: 900,
      md: 1200,
      lg: 1600,
      xl: 1920,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Provider store={Store}>
      <MuiThemeProvider theme={BreakpointOverrides}>
        <StyledThemeProvider theme={colors}>
          <GlobalStyle />
          <App />
        </StyledThemeProvider>
      </MuiThemeProvider>
    </Provider>
  // </React.StrictMode>
);
