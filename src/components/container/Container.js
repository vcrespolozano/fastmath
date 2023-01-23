import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import './Container.scss';

function Container() {

  const theme = useContext(GlobalContext);

  return (
    <div className={`container theme-${theme}`}>
      <p>Aquí arranca la app chaval</p>
    </div>
  );
}

export default Container;
