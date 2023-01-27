import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../../contexts/GlobalContext';
import './Button.scss';

const Button = ({label, onClick, className, width, height, selected}) => {

  const context = useContext(GlobalContext);

  if (!label || !onClick) {
    return null;
  }

  return (
    <button
      className={`button theme-${context.theme} ${selected ? 'selected' : ''} ${className ? className : ''}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

Button.defaultProps = {
  className: '',
  width: 160,
  height: 90,
}

export default Button;