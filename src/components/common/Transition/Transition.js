import { useEffect, useContext } from 'react';
import { ImCross, ImPlus, ImMinus } from 'react-icons/im';
import { TiDivide } from 'react-icons/ti';
import { GlobalContext } from '../../../contexts/GlobalContext';

const Transition = () => {

  const {
    setTransition,
    theme,
    setTransitionOver,
  } = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(() => {
      setTransition(false);
      setTransitionOver(true);
    }, 2000);
  }, [setTransition]);

  return (
    <div className={`transition theme-${theme}`}>
      <div className="transition_container">
        <span className="transition__icon cross"><ImCross size="14px" /></span>
        <span className="transition__icon plus"><ImPlus size="14px" /></span>
        <span className="transition__icon minus"><ImMinus size="14px" /></span>
        <span className="transition__icon divide"><TiDivide size="20px" /></span>
      </div>
    </div>
  )
}

export default Transition;