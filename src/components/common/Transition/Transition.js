import { useEffect, useContext } from 'react';
import { FaPlus, FaMinus, FaTimes, FaDivide } from 'react-icons/fa';
import { GlobalContext } from '../../../contexts/GlobalContext';

const Transition = () => {

  const {
    setTransition,
    setTransitionOver,
  } = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(() => {
      setTransition(false);
      setTransitionOver(true);
    }, 2000);
  }, [setTransition, setTransitionOver]);

  return (
    <div className="transition">
      <div className="transition__circle">
        <span className="transition__circle_icon animate__animated animate__heartBeat"><FaTimes size="55px" /></span>
        <span className="transition__circle_icon animate__animated animate__heartBeat animate__delay-500ms"><FaPlus size="55px" /></span>
        <span className="transition__circle_icon animate__animated animate__heartBeat animate__delay-1s"><FaMinus size="55px" /></span>
        <span className="transition__circle_icon animate__animated animate__heartBeat animate__delay-1500ms"><FaDivide size="55px" /></span>
      </div>
    </div>
  )
}

export default Transition;