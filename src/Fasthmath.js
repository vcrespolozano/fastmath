import { useState, useEffect } from 'react';
import { GlobalContext } from './contexts/GlobalContext';
import Container from './components/container/Container';
import 'animate.css';
import './styles/global.scss';
import { APP_GAME_DIFFICULTIES, APP_GAME_MODES } from './constants/constants';

function Fastmath() {

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
  const [transition, setTransition] = useState(false);
  const [transitionOver, setTransitionOver] = useState(false);

  const closeOpenedElements = (event) => {
    var target = event.target;
    var classList = [];

    while (target) {
      if (target.classList) {
        classList = classList.concat(Array.from(target.classList));
      }
      target = target.parentNode;
    }

    if (classList.length > 0) {
      // Controlo para cerrar los comboBox
      if (classList.indexOf('comboBox') === -1) {
        setOpenedComboBoxId(null);
      }
    }
  }

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', closeOpenedElements);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const context = {
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
    windowSize,
    transition,
    setTransition,
    transitionOver,
    setTransitionOver,
  }

  return (
    <GlobalContext.Provider value={context}>
      <Container />
    </GlobalContext.Provider>
  );
}

export default Fastmath;
