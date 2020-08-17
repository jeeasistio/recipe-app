import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Grid, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

const App = () => {
  
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      secondary: {
        main: '#f93',
        contrastText: '#fff'
      }
    },
    typography: {
      fontFamily: '"Lato", "Roboto", "sans-serif"'
    }
  })
  
  const [currTab, setCurrTab] = useState(0);
  return (
    <div className="App">
      <CssBaseline>
      <ThemeProvider theme={theme}>
        <Header tab={currTab} setCurrTab={setCurrTab} />
        <Main tab={currTab} />
      </ThemeProvider>
      </CssBaseline>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);