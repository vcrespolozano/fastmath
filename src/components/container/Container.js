import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Header } from '../header/Header';
import './Container.scss';

function Container() {

  const theme = useContext(GlobalContext);

  return (
    <div className={`container theme-${theme}`}>
      <Header />
      <p>Aquí arranca la app chaval</p>
    </div>
  );
}

export default Container;
