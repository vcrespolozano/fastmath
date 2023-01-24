import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import './Header.scss';

export const Header = () => {
  const theme = useContext(GlobalContext);

  return (
    <div className="header">
      <div className="header__logo"></div>
    </div>
  )
}
