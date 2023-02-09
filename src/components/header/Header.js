import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { BiTrophy } from 'react-icons/bi';
import ThemeSelector from './ThemeSelector/ThemeSelector';

export const Header = () => {

  const { theme, setShowResults } = useContext(GlobalContext);

  return (
    <div className={`header theme-${theme}`}>
      <div className="header__logo"></div>
      <div className="header__options">
        <ThemeSelector />
        <span title="Ver resultados" className="header__options_showResults" onClick={() => setShowResults(true)}><BiTrophy size="24px" /></span>
      </div>
    </div>
  )
}
