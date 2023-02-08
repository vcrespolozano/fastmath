import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Footer } from '../footer/Footer';
import GameContainer from '../GameContainer/GameContainer';
import Countdown from '../Countdown/Countdown';
import { Header } from '../header/Header';
import Instructions from '../Instructions/Instructions';
import GameResults from '../GameResults/GameResults';
import Menu from '../Menu/Menu';

const Container = () => {

  const {
    countDownEnabled,
    showInstructions,
    showResults,
    showMenu
  } = useContext(GlobalContext);

  return (
    <div className="container">
      <Header />
      {!showResults && <GameContainer />}
      <Footer />
      {countDownEnabled && <Countdown />}
      {showInstructions && <Instructions />}
      {showResults && <GameResults />}
      {showMenu && <Menu />}
    </div>
  );
}

export default Container;
