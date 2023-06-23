import PropTypes from 'prop-types';

const Button = ({
  label,
  onClick,
  className,
  width,
  height,
  selected,
  disabled
}) => {

  if (!label || !onClick) {
    return null;
  }

  return (
    <button
      className={`button ${selected ? 'selected' : ''} ${className ? className : ''}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={!disabled ? onClick : null}
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