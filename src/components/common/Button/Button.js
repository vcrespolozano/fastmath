import PropTypes from 'prop-types';
import { BiTrophy } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';

const BUTTON_COLOR = {
  MAIN: 'color_main',
  SECONDARY: 'color_secondary',
}

const BUTTON_ICONS = {
  INFO: 'info',
  SCORES: 'scores',
}

const Button = ({
  label,
  onClick,
  className,
  width,
  height,
  selected,
  disabled,
  color,
  icon,
}) => {

  if (!label || !onClick) {
    return null;
  }

  return (
    <button
      className={`button ${selected ? 'selected' : ''} ${color} ${className ? className : ''}`}
      style={{ width: `${width}`, height: `${height}px` }}
      onClick={!disabled ? onClick : null}
    >
      {icon && (
        <span className="button__icon">
          {icon === 'info' && (<BsInfoCircle size="24px" />)}
          {icon === 'scores' && (<BiTrophy size="24px" />)}
        </span>
      )}
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.number,
  color: PropTypes.string,
  icon: PropTypes.string,
}

Button.defaultProps = {
  className: '',
  width: '160px',
  height: 90,
  color: BUTTON_COLOR.MAIN,
  icon: null,
}

export default Button;
export { BUTTON_COLOR, BUTTON_ICONS };