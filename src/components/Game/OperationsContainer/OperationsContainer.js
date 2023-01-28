import { useRef, useEffect } from 'react';
import './OperationsContainer.scss';

const OperationsContainer = (props) => {

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [props.children]);

  return (
    <div
      ref={divRef}
      style={{
        height: '400px',
        overflow: 'auto',
        overflowScrolling: 'touch',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: '-ms-autohiding-scrollbar',
        scrollbarWidth: 'none'
      }}
      className="operationsContainer">
        {props.children}
    </div>
  )
}

export default OperationsContainer;