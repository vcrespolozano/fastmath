import { useState } from 'react';
import { GlobalContext } from './contexts/GlobalContext';
import Container from './components/container/Container';

// Reading and Setting theme
const currentTheme = localStorage.getItem('appTheme') || 'default';

function Fastmath() {

  const [theme, setTheme] = useState(currentTheme);
  const [countDownEnabled, setCountDownEnabled] = useState(false);

  const context = {
    theme,
    setTheme,
    countDownEnabled,
    setCountDownEnabled
  }

  return (
    <GlobalContext.Provider value={context}>
      <Container />
    </GlobalContext.Provider>
  );
}

export default Fastmath;
