import { useContext } from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../../contexts/GlobalContext';

const TEXT_SIZE = {
  SMALL: 'size_small',
  NORMAL: 'size_normal',
  BIG: 'size_big',
  TITLE: 'size_title',
}

const TEXT_WEIGHT = {
  LIGHT: 'weight_light',
  REGULAR: 'weight_regular',
  MEDIUM: 'weight_medium',
}

const TEXT_KIND = {
  PARAGRAPH: 'PARAGRAPH',
  SPAN: 'SPAN',
  DIV: 'DIV',
  LABEL: 'LABEL',
}

const TEXT_DISPLAY = {
  BLOCK: 'display_block',
  INLINE_BLOCK: 'display_inline-block',
  INLINE: 'display_inline',
}

const TEXT_ALIGN = {
  CENTER: 'align_center',
  LEFT: 'align_left',
  RIGHT: 'align_right',
  JUSTIFY: 'align_justify',
}

const Text = ({
  align,
  className,
  display,
  kind,
  size,
  value,
  weight,
  marginTop,
  marginBottom,
}) => {
  
  const { theme } = useContext(GlobalContext);

  if (!value) {
    return null;
  }


  switch (kind) {
    case TEXT_KIND.PARAGRAPH:
      return <p className={`text theme-${theme} ${size} ${weight} ${align} ${display} ${className} ${marginTop ? 'margin_top' : ''} ${marginBottom ? 'margin_bottom' : ''}`}>{parse(value)}</p>;
    case TEXT_KIND.SPAN:
      return <span className={`text theme-${theme} ${size} ${weight} ${align} ${display} ${className} ${marginTop ? 'margin_top' : ''} ${marginBottom ? 'margin_bottom' : ''}`}>{parse(value)}</span>;
    case TEXT_KIND.DIV:
      return <div className={`text theme-${theme} ${size} ${weight} ${align} ${display} ${className} ${marginTop ? 'margin_top' : ''} ${marginBottom ? 'margin_bottom' : ''}`}>{parse(value)}</div>;
    case TEXT_KIND.LABEL:
      return <label className={`text theme-${theme} ${size} ${weight} ${align} ${display} ${className} ${marginTop ? 'margin_top' : ''} ${marginBottom ? 'margin_bottom' : ''}`}>{parse(value)}</label>;
  }

  return null;
}

Text.propTypes = {
  value: PropTypes.string.isRequired,
  size: PropTypes.string,
  weight: PropTypes.string,
  kind: PropTypes.string,
  display: PropTypes.string,
  align: PropTypes.string,
  className: PropTypes.string,
}

Text.defaultProps = {
  size: TEXT_SIZE.NORMAL,
  weight: TEXT_WEIGHT.REGULAR,
  kind: TEXT_KIND.PARAGRAPH,
  display: TEXT_DISPLAY.BLOCK,
  align: TEXT_ALIGN.LEFT,
  className: '',
}

export default Text;
export { TEXT_SIZE, TEXT_WEIGHT, TEXT_KIND, TEXT_DISPLAY, TEXT_ALIGN };