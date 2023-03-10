import { useState, useEffect } from 'react';
import { GlobalContext } from './contexts/GlobalContext';
import Container from './components/container/Container';
import 'animate.css';
import './styles/global.scss';
import { APP_GAME_DIFFICULTIES, APP_GAME_MODES } from './constants/constants';

// Reading and Setting theme
const currentTheme = localStorage.getItem('appTheme') || 'default';

function Fastmath() {

  const [theme, setTheme] = useState(currentTheme);
  const [countDownEnabled, setCountDownEnabled] = useState(false);
  const [mode, setMode] = useState(APP_GAME_MODES.CLASSIC);
  const [difficulty, setDifficulty] = useState(APP_GAME_DIFFICULTIES.FACIL);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [operationsSolved, setOperationsSolved] = useState([]);
  const [timeUsed, setTimeUsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [openedComboBoxId, setOpenedComboBoxId] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    setGameEnded,
    showInstructions,
    setShowInstructions,
    operationsSolved,
    setOperationsSolved,
    timeUsed,
    setTimeUsed,
    showResults,
    setShowResults,
    openedComboBoxId,
    setOpenedComboBoxId,
    windowSize
  }

  return (
    <GlobalContext.Provider value={context}>
      <Container />
    </GlobalContext.Provider>
  );
}

export default Fastmath;
