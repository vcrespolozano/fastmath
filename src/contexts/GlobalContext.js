import { createContext } from 'react';

export const GlobalContext = createContext({
  theme: 'default',
  setTheme: (theme) => {},
  countDownEnabled: false,
  setCountDownEnabled: (countDownEnabled) => {},
  mode: null,
  setMode: (mode) => {},
  difficulty: null,
  setDifficulty: (difficulty) => {},
  gameStarted: false,
  setGameStarted: (gameStarted) => {},
  gameEnded: false,
  setGameEnded: (gameEnded) => {},
  showInstructions: false,
  setShowInstructions: (showInstructions) => {}
});