import { useState, useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { ImCross } from 'react-icons/im';
import { BiTrophy } from 'react-icons/bi';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
} from '../common/Text/Text';
import Button from '../common/Button/Button';
import ThemeSelector from '../header/ThemeSelector/ThemeSelector';

const Menu = () => {

  const { theme, setShowMenu, setShowResults } = useContext(GlobalContext);

  const [animation, setAnimation] = useState('animate__slideInRight');

  const menuClose = () => {
    setAnimation('animate__slideOutRight');
    setTimeout(setShowMenu, 1000, false);
  }

  const seeResults = () => {
    setTimeout(setShowMenu, 1000, false);
    setShowResults(true);
  }

  return (
    <div className={`menu theme-${theme} animate__animated ${animation}`}>
      <span
        className="menu__close"
        onClick={menuClose}
      >
        <ImCross size="14px" />
      </span>
      <Text
        value="Colores"
        size={TEXT_SIZE.BIG}
        weight={TEXT_WEIGHT.REGULAR}
        kind={TEXT_KIND.PARAGRAPH}
        display={TEXT_DISPLAY.BLOCK}
        align={TEXT_ALIGN.CENTER}
      />
      <ThemeSelector />
      <Button
        label="Resultados"
        width={200}
        height={55}
        onClick={seeResults}
      />
    </div>
  )
}

export default Menu;