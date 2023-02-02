import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Footer } from '../footer/Footer';
import GameContainer from '../GameContainer/GameContainer';
import Countdown from '../Countdown/Countdown';
import { Header } from '../header/Header';
import Instructions from '../Instructions/Instructions';

const Container = () => {

  const { countDownEnabled, showInstructions } = useContext(GlobalContext);

  return (
    <div className="container">
      <Header />
      <GameContainer />
      <Footer />
      {countDownEnabled && <Countdown />}
      {showInstructions && <Instructions />}
    </div>
  );
}

export default Container;
