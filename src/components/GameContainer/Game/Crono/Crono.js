import { useState, useEffect, useRef } from 'react';
import Text, {
  TEXT_SIZE,
  TEXT_WEIGHT,
  TEXT_KIND,
  TEXT_DISPLAY,
  TEXT_ALIGN,
} from '../../../common/Text/Text';

const Crono = ({start, stop, setGameSeconds}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (start && !isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(time => time + 1);
        setGameSeconds(time => time + 1);
      }, 1000);
    } else if (stop && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [start, stop, isRunning]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, [intervalRef]);
  
  const minutes = Math.floor(time / 60);
  const minutesStr = minutes.toString().padStart(2, "0");
  const seconds = time % 60;
  const secondsStr = seconds.toString().padStart(2, "0");

  return (
    <Text
      value={`${minutesStr}:${secondsStr}`}
      size={TEXT_SIZE.NORMAL}
      weight={TEXT_WEIGHT.REGULAR}
      kind={TEXT_KIND.PARAGRAPH}
      display={TEXT_DISPLAY.BLOCK}
      align={TEXT_ALIGN.CENTER}
      className="crono"
    />
  );
}

export default Crono;