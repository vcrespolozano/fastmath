import React, { useRef, useEffect } from 'react';
import { animateScroll as scroll } from "react-scroll";
import Operation from '../Operation/Operation';
import './OperationsContainer.scss';

const OperationsContainer = ({operations}) => {

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
    <div className="operationsContainer">
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
            />
          })
        )
      }
    </div>
  )
}

export default OperationsContainer;