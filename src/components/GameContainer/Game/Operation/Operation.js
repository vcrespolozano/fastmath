import { useEffect, useState } from 'react';

const Operation = ({op1, op2, operator, operatorSent, result, last}) => {

  const [operationClass, setOperationClass] = useState(null);

  useEffect(() => {
    if (operatorSent && operator) {
      const auxClass = operator === operatorSent ? 'solved-right' : 'solved-wrong';
      setOperationClass(auxClass);
    }
  }, [operator, operatorSent])
  

  return (
    <div className={`operation ${last ? 'animate__animated animate__slideInUp' : ''} ${operationClass}`}>
      <span className="operation__number">{op1}</span>
      <span className="operation__operator">{operatorSent || '?'}</span>
      <span className="operation__number">{op2}</span>
      <span className="operation__equal">=</span>
      <span className="operation__number">{result}</span>
    </div>
  )
}

export default Operation;