import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../../../contexts/GlobalContext';

const Operation = ({
  op1,
  op2,
  operator,
  operatorSent,
  result,
  last
}) => {

  const { setAnswerLight } = useContext(GlobalContext);

  useEffect(() => {
    if (operatorSent && operator) {
      setAnswerLight(operator === operatorSent ? 'OK' : 'KO');
    }
  }, [operator, operatorSent]);

  return (
    <div className={`operation ${last ? 'animate__animated animate__slideInUp' : ''}`}>
      <span className="operation__number">{op1}</span>
      <span className="operation__operator">{operatorSent || '?'}</span>
      <span className="operation__number">{op2}</span>
      <span className="operation__equal">=</span>
      <span className="operation__number">{result}</span>
    </div>
  )
}

export default Operation;