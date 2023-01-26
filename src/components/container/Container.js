import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Footer } from '../footer/Footer';
import GameContainer from '../GameContainer/GameContainer';
import { Header } from '../header/Header';
import './Container.scss';

const Container = () => {

  const context = useContext(GlobalContext);

  return (
    <div className={`container theme-${context.theme}`}>
      <Header />
      <GameContainer />
      <Footer />
    </div>
  );
}

export default Container;
