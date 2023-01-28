import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import './Countdown.scss';
import 'animate.css';
import { useEffect, useState } from 'react';

const Countdown = () => {

  const [count, setCount] = useState(4);

  const { setCountDownEnabled } = useContext(GlobalContext);

  const executeCountdown = () => {
    if (count > 0) {
      setTimeout(setCount, 1000, count-1);
    }
  }

  useEffect(() => {
    if (count > 0) {
      executeCountdown();
    } else {
      setCountDownEnabled(false);
    }
  }, [count]);

  return (
    <div className="countdown">
      <span className={`countdown__item animate__animated ${count === 4 ? 'animate__zoomIn' : 'hidden animate__fadeOut'}`}>3</span>
      <span className={`countdown__item animate__animated ${count === 3 ? 'animate__zoomIn' : 'hidden animate__fadeOut'}`}>2</span>
      <span className={`countdown__item animate__animated ${count === 2 ? 'animate__zoomIn' : 'hidden animate__fadeOut'}`}>1</span>
      <span className={`countdown__item animate__animated ${count === 1 ? 'animate__zoomIn' : 'hidden animate__fadeOut'}`}>Go!</span>
    </div>
  )
}

export default Countdown;