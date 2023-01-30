import { useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { APP_THEMES } from '../../../constants/constants';

function ThemeSelector() {

  const context = useContext(GlobalContext);
  const { theme, setTheme } = context;

  const selectTheme = (optionSelected) => {
    if (optionSelected !== context.theme) {
      localStorage.setItem('appTheme', optionSelected);
      setTheme(optionSelected);
    }
  }

  return (
    <div className="themeSelector">
      <span className={`themeSelector__option default${theme === APP_THEMES.DEFAULT ? ' selected' : ''}`} onClick={() => selectTheme(APP_THEMES.DEFAULT)}></span>
      <span className={`themeSelector__option orange${theme === APP_THEMES.ORANGE ? ' selected' : ''}`} onClick={() => selectTheme(APP_THEMES.ORANGE)}></span>
      <span className={`themeSelector__option red${theme === APP_THEMES.RED ? ' selected' : ''}`} onClick={() => selectTheme(APP_THEMES.RED)}></span>
      <span className={`themeSelector__option blue${theme === APP_THEMES.BLUE ? ' selected' : ''}`} onClick={() => selectTheme(APP_THEMES.BLUE)}></span>
    </div>
  );
}

export default ThemeSelector;
