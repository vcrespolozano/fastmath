import { useContext, useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../../contexts/GlobalContext';

const ComboBox = ({options, indexSelected, handleSelect, className, id}) => {

  const { openedComboBoxId, setOpenedComboBoxId } = useContext(GlobalContext);

  const [selectedOption, setSelectedOption] = useState(null);
  const [comboOpen, setComboOpen] = useState(false);

  useEffect(() => {
    if (Array.isArray(options) && options.length > 0) {
      if (!indexSelected) {
        setSelectedOption(options[0]);
      } else {
        setSelectedOption(options[indexSelected]);
      }
    }
  }, [options, indexSelected]);

  useEffect(() => {
    if (id !== openedComboBoxId) {
      setComboOpen(false);
    }
  }, [openedComboBoxId, id]);

  const selectOption = (index) => {
    setSelectedOption(options[index]);
    handleSelect(options[index].key);
    setComboOpen(false);
  }

  const openCombo = () => {
    setOpenedComboBoxId(id);
    setComboOpen(!comboOpen);
  }

  if (!id || !options || !Array.isArray(options) || options.length === 0) {
    return false;
  }

  return (
    <div className={`comboBox ${className || ''}`}>
      {selectedOption && (
        <div className="comboBox__selectedOption" onClick={openCombo}>{selectedOption.label} <FiChevronDown size="20px" /></div>
      )}
      <div className={`comboBox__combo ${comboOpen ? 'opened' : 'hidden'}`}>
        {Array.isArray(options) && options.length > 0 && (
          options.map((option, index) => {
            return (
              <span key={`combo-${index}`} className="comboBox__combo_option" onClick={() => selectOption(index)}>{option.label}</span>
            )
          })
        )}
      </div>
    </div>
  )
}

ComboBox.propTypes = {
  options: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ComboBox.defaultProps = {
  className: '',
}

export default ComboBox;