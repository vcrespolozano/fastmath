import { createContext } from 'react';

export const GlobalContext = createContext({
  theme: null,
  setTheme: (theme) => {}
});