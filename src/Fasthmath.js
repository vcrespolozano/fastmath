import { useState } from 'react';
import { GlobalContext } from './contexts/GlobalContext';
import Container from './components/container/Container';
import './global.scss';

// Reading and Setting theme
const currentTheme = localStorage.getItem('appTheme') || 'default';

function Fastmath() {

  const [theme, setTheme] = useState(currentTheme);

  return (
    <GlobalContext.Provider value={{theme, setTheme}}>
      <Container />
    </GlobalContext.Provider>
  );
}

export default Fastmath;
