import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Footer } from '../footer/Footer';
import GameContainer from '../GameContainer/GameContainer';
import Countdown from '../Countdown/Countdown';
import { Header } from '../header/Header';

const Container = () => {

  const { theme, countDownEnabled } = useContext(GlobalContext);

  return (
    <div className={`container theme-${theme}`}>
      <Header />
      <GameContainer />
      <Footer />
      {countDownEnabled && <Countdown />}
    </div>
  );
}

export default Container;
