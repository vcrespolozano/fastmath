import { useEffect, useState } from 'react';

const Operation = ({
  op1,
  op2,
  operator,
  operatorSent,
  result,
  last
}) => {

  const [operationClass, setOperationClass] = useState(null);

  useEffect(() => {
    let auxClass = `operation ${last ? 'animate__animated animate__slideInUp' : ''}`;
    if (operatorSent && operator) {
      auxClass += operator === operatorSent ? ' solved-right' : ' solved-wrong';
    }
    setOperationClass(auxClass);
  }, [last, operator, operatorSent]);

  return (
    <div className={operationClass}>
      <span className="operation__number">{op1}</span>
      <span className="operation__operator">{operatorSent || '?'}</span>
      <span className="operation__number">{op2}</span>
      <span className="operation__equal">=</span>
      <span className="operation__number">{result}</span>
    </div>
  )
}

export default Operation;