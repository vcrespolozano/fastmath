import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import ThemeSelector from './ThemeSelector/ThemeSelector';

export const Header = () => {

  const { theme } = useContext(GlobalContext);

  return (
    <div className={`header theme-${theme}`}>
      <div className="header__logo"></div>
      <div className="header__options">
        <ThemeSelector />
      </div>
    </div>
  )
}
