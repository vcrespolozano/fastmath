import './Header.scss';
import ThemeSelector from './ThemeSelector/ThemeSelector';

export const Header = () => {

  return (
    <div className="header">
      <div className="header__logo"></div>
      <div className="header__options">
        <ThemeSelector />
      </div>
    </div>
  )
}
