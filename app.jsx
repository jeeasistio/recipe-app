import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Grid, CssBaseline } from '@material-ui';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

const App = () => {
  const [currTab, setCurrTab] = useState(0);
  return (
    <div className="App">
      <CssBaseline>
        <Header tab={currTab} setCurrTab={setCurrTab} />
        <Main tab={currTab} />
      </CssBaseline>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);