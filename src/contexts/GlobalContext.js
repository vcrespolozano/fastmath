import { createContext } from 'react';

export const GlobalContext = createContext({
  theme: 'default',
  setTheme: (theme) => {},
  countDownEnabled: false,
  setCountDownEnabled: (countDownEnabled) => {},
});