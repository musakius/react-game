import React, {useState, useEffect} from 'react';
import './ControlSelect.scss';

const ControlSelect = ({title, onChangeValue, value, disableReturnGame, elements}) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (disableReturnGame) setShowMessage(true);
  }, [value]);

  return (
    <fieldset className="form-group jumbotron w-47 pb-0">
      <h3 className="name-block">{title}</h3>
      <select className="form-control" value={value} onChange={(e) => onChangeValue(e)}>
        {elements.map((el, i) => {
          return (
            <option key={i} value={el.value}>
              {el.content}
            </option>
          );
        })}
      </select>
      {showMessage ? <p className="message-new-game mb-0 mt-2">Now start a new game</p> : null}
    </fieldset>
  );
};

export default ControlSelect;
