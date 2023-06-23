import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Footer } from '../footer/Footer';
import GameContainer from '../GameContainer/GameContainer';
import Countdown from '../Countdown/Countdown';
import { Header } from '../header/Header';
import Instructions from '../Instructions/Instructions';
import GameResults from '../GameResults/GameResults';
import Transition from '../common/Transition/Transition';

const Container = () => {

  const {
    countDownEnabled,
    showInstructions,
    showResults,
    transition,
    setTransition,
    transitionOver,
    setTransitionOver,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (!transition) {
      setTransitionOver(false);
      setTransition(true);
    }
  }, [setTransition, showResults]);

  return (
    <div className="container">
      <Header />
      {!showResults && transitionOver && <GameContainer />}
      <Footer />
      {countDownEnabled && <Countdown />}
      {showInstructions && <Instructions />}
      {showResults && transitionOver && <GameResults />}
      {transition && <Transition />}
    </div>
  );
}

export default Container;
