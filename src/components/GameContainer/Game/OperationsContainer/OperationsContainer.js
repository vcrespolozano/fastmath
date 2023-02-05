import React, { useRef, useEffect, useContext } from 'react';
import { animateScroll as scroll } from "react-scroll";
import { GlobalContext } from '../../../../contexts/GlobalContext';
import Operation from '../Operation/Operation';

const OperationsContainer = ({operations}) => {

  const { theme } = useContext(GlobalContext);

  const lastElementRef = useRef(null);

  const scrollToLastElement = () => {
    if (lastElementRef && lastElementRef.current) {
      scroll.scrollTo(lastElementRef.current.offsetTop);
    }
  }
  
  useEffect(() => {
    scrollToLastElement();
  }, [operations]);

  return (
    <div className={`operationsContainer theme-${theme}`}>
      {
        operations && operations.length > 0 && (
          operations.map((itemOperation, index) => {
            return <Operation
              key={`operation-${index}`}
              op1={itemOperation.op1}
              op2={itemOperation.op2}
              operator={itemOperation.operator}
              operatorSent={itemOperation.operatorSelected}
              result={itemOperation.result}
              last={index === operations.length - 1}
              theme={theme}
            />
          })
        )
      }
    </div>
  )
}

export default OperationsContainer;