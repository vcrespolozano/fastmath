import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { BiTrophy } from 'react-icons/bi';

export const Header = () => {

  const { setShowResults } = useContext(GlobalContext);

  return (
    <div className="header">
      <div className="header__logo"></div>
      <span title="Ver resultados" className="header__showResults" onClick={() => setShowResults(true)}><BiTrophy size="24px" /></span>
    </div>
  )
}
