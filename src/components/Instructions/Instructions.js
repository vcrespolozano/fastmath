import { useState, useContext } from 'react';
import { ImCross } from 'react-icons/im';
import { GlobalContext } from '../../contexts/GlobalContext';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
} from '../common/Text/Text';
import { instructionsData } from './textConstants';

const Instructions = () => {

  const { setShowInstructions, theme } = useContext(GlobalContext);

  return (
    <div className="modal">
      <div className={`instructions theme-${theme}`}>
        <span 
          className="instructions__close"
          onClick={() => setShowInstructions(false)}
        >
          <ImCross
            className="instructions__close_icon"
            size="16px"
          />
        </span>
        <Text
          value={instructionsData.mainTitle}
          size={TEXT_SIZE.REGULAR}
          weight={TEXT_WEIGHT.MEDIUM}
          kind={TEXT_KIND.LABEL}
          display={TEXT_DISPLAY.BLOCK}
          align={TEXT_ALIGN.CENTER}
        />
      </div>
    </div>
  )
}

export default Instructions;
