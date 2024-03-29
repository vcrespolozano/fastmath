import { useState, useContext } from 'react';
import { ImCross, ImPlus, ImMinus } from 'react-icons/im';
import { TiDivide } from 'react-icons/ti';
import { GlobalContext } from '../../contexts/GlobalContext';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
  TEXT_COLOR,
} from '../common/Text/Text';
import { instructionsData } from './textConstants';

const Instructions = () => {

  const { setShowInstructions } = useContext(GlobalContext);

  const [closing, setClosing] = useState(false);

  const closeInstructions = () => {
    setClosing(true);
    setTimeout(() => {
      setShowInstructions(false);
      setClosing(false);
    }, 500);
  }

  return (
    <div className="modal">
      <div className={`instructions ${closing ? 'leaving' : 'entering'}`}>
        <span 
          className="instructions__icon cross"
          onClick={closeInstructions}
        >
          <ImCross size="14px" />
        </span>
        <span className="instructions__icon plus"><ImPlus size="14px" /></span>
        <span className="instructions__icon minus"><ImMinus size="14px" /></span>
        <span className="instructions__icon divide"><TiDivide size="20px" /></span>
        <div className="instructions__content">
          <div className="instructions__content_textBlock">
            <Text
              value={instructionsData.mainTitle}
              size={TEXT_SIZE.BIG}
              weight={TEXT_WEIGHT.MEDIUM}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.LEFT}
              className="instructions__content_title"
              color={TEXT_COLOR.MAIN}
            />
            <Text
              value={instructionsData.mainDescription}
              size={TEXT_SIZE.NORMAL}
              weight={TEXT_WEIGHT.REGULAR}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.JUSTIFY}
              className="instructions__content_description"
              color={TEXT_COLOR.SECONDARY}
            />
          </div>
          <div className="instructions__content_textBlock">
            <Text
              value={instructionsData.gameModesTitle}
              size={TEXT_SIZE.BIG}
              weight={TEXT_WEIGHT.MEDIUM}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.LEFT}
              className="instructions__content_title"
              color={TEXT_COLOR.MAIN}
            />
            <Text
              value={instructionsData.gameModesDescription}
              size={TEXT_SIZE.NORMAL}
              weight={TEXT_WEIGHT.REGULAR}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.JUSTIFY}
              className="instructions__content_description"
              color={TEXT_COLOR.SECONDARY}
            />
            <Text
              value={instructionsData.gameModes.clasico}
              size={TEXT_SIZE.NORMAL}
              weight={TEXT_WEIGHT.REGULAR}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.JUSTIFY}
              className="instructions__content_description"
              color={TEXT_COLOR.SECONDARY}
            />
            <Text
              value={instructionsData.gameModes.contrareloj}
              size={TEXT_SIZE.NORMAL}
              weight={TEXT_WEIGHT.REGULAR}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.JUSTIFY}
              className="instructions__content_description"
              color={TEXT_COLOR.SECONDARY}
            />
            <Text
              value={instructionsData.gameModes.sin_fallos}
              size={TEXT_SIZE.NORMAL}
              weight={TEXT_WEIGHT.REGULAR}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.JUSTIFY}
              className="instructions__content_description"
              color={TEXT_COLOR.SECONDARY}
            />
            <Text
              value={instructionsData.gameModes.cadena}
              size={TEXT_SIZE.NORMAL}
              weight={TEXT_WEIGHT.REGULAR}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.JUSTIFY}
              className="instructions__content_description"
              color={TEXT_COLOR.SECONDARY}
            />
          </div>
          <div className="instructions__content_textBlock">
            <Text
              value={instructionsData.difficultiesTitle}
              size={TEXT_SIZE.BIG}
              weight={TEXT_WEIGHT.MEDIUM}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.LEFT}
              className="instructions__content_title"
              color={TEXT_COLOR.MAIN}
            />
            <Text
              value={instructionsData.difficultiesDescription}
              size={TEXT_SIZE.NORMAL}
              weight={TEXT_WEIGHT.REGULAR}
              kind={TEXT_KIND.PARAGRAPH}
              display={TEXT_DISPLAY.BLOCK}
              align={TEXT_ALIGN.JUSTIFY}
              className="instructions__content_description"
              color={TEXT_COLOR.SECONDARY}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instructions;
