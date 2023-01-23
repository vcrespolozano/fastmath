import Container from './components/container/Container';
import { GlobalContext } from './contexts/GlobalContext';
import './global.scss';

// Reading and Setting theme
const currentTheme = localStorage.getItem('appTheme') || 'default';

function Fastmath() {
  return (
    <GlobalContext.Provider value={currentTheme}>
      <Container />
    </GlobalContext.Provider>
  );
}

export default Fastmath;
