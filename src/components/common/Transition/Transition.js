import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
  TEXT_COLOR,
} from '../../common/Text/Text';

const Transition = () => {

  const {
    setTransition,
    setTransitionOver,
  } = useContext(GlobalContext);

  const [loaderPercent, setLoaderPercent] = useState(0);

  useEffect(() => {
    const loaderInterval = setInterval(() => {
      if (loaderPercent < 100) {
        setLoaderPercent(prevLoaderPercent => {
          if (prevLoaderPercent < 100) {
            return prevLoaderPercent + 1;
          } else {
            clearInterval(loaderInterval);
            return prevLoaderPercent;
          }
        });
      }
    }, 10);

    return () => {
      clearInterval(loaderInterval);
    }
  }, []);

  useEffect(() => {
    if (loaderPercent === 100) {
      setTransition(false);
      setTransitionOver(true);
    }
  }, [loaderPercent, setTransition, setTransitionOver]);

  return (
    <div className="transition">
      <div className="transition_line">
        <span className="transition_line_fill" style={{ width: `${loaderPercent}%` }} />
        <Text
          value={`${loaderPercent}%`}
          size={TEXT_SIZE.NORMAL}
          weight={TEXT_WEIGHT.MEDIUM}
          kind={TEXT_KIND.SPAN}
          display={TEXT_DISPLAY.BLOCK}
          align={TEXT_ALIGN.CENTER}
          className="transition_line_percent"
          color={TEXT_COLOR.SECONDARY}
        />
      </div>
    </div>
  )
}

export default Transition;