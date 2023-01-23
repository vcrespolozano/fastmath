import React from 'react';
import Container from './components/container/Container';
import './global.css';

export const GlobalContext = React.createContext();

// Reading and Setting theme
const currentTheme = localStorage.getItem('appTheme') || 'default';

function Fastmath() {
  return (
    <GlobalContext.Provider appTheme={currentTheme}>
      <Container />
    </GlobalContext.Provider>
  );
}

export default Fastmath;
