import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { FiMenu } from 'react-icons/fi';

export const Header = () => {

  const { theme, setShowMenu } = useContext(GlobalContext);

  return (
    <div className={`header theme-${theme}`}>
      <div className="header__logo"></div>
      <span
        className="header__launchMenu"
        onClick={() => setShowMenu(true)}
      >
        <FiMenu size="30px" />
      </span>
    </div>
  )
}
