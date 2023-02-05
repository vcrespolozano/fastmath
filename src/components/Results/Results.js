import React, { useContext } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';

const Results = () => {

  const { theme } = useContext(GlobalContext);

  return (
    <div className={`results theme-${theme}`}>Results</div>
  )
}

export default Results;