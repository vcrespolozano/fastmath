import { useState } from 'react';
import { GlobalContext } from './contexts/GlobalContext';
import Container from './components/container/Container';
import 'animate.css';
import './styles/global.scss';

// Reading and Setting theme
const currentTheme = localStorage.getItem('appTheme') || 'default';

function Fastmath() {

  const [theme, setTheme] = useState(currentTheme);
  const [countDownEnabled, setCountDownEnabled] = useState(false);
  const [mode, setMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const context = {
    theme,
    setTheme,
    countDownEnabled,
    setCountDownEnabled,
    mode,
    setMode,
    difficulty,
    setDifficulty,
    gameStarted,
    setGameStarted,
    gameEnded,
    setGameEnded
  }

  return (
    <GlobalContext.Provider value={context}>
      <Container />
    </GlobalContext.Provider>
  );
}

export default Fastmath;
