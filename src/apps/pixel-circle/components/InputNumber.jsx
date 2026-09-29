import { useEffect, useRef } from 'react';

import LongPressButton from './LongPressButton.jsx';

import '../css/InputNumber.css';

const InputNumber = props => {
  const min = props.min || Number.MIN_VALUE;
  const max = props.max || Number.MAX_VALUE;

  const onChange = v => {
    const input = inputRef.current;
    input.focus();

    if (props.onChange) {
      props.onChange(Math.max(min, Math.min(max, v)));
    }
  };

  const inputRef   = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const input   = inputRef.current;
    const buttons = buttonsRef.current;

    const observer = new ResizeObserver(() => {
      const inputBoundingRect   = input.getBoundingClientRect();
      const buttonsBoundingRect = buttons.getBoundingClientRect();

      const computedStyle = window.getComputedStyle(input);

      buttons.style.height = `${inputBoundingRect.height}px`;
      buttons.style.top    = `${inputBoundingRect.top}px`;
      buttons.style.left   = `${inputBoundingRect.right - parseFloat(computedStyle.paddingRight) - buttonsBoundingRect.width}px`;
    });

    observer.observe(input);
  }, []);

  return (
    <div className='InputNumber'>
      <input 
        id={props.id} 
        ref={inputRef} 
        className={`InputNumber-Input form-control fs-4${props.className ? ' ' + props.className: ''}`} 
        name={props.name} 
        type='number' 
        min={props.min} 
        max={props.max} 
        value={props.value} 
        onChange={e => onChange(e.target.value)} />
      <div ref={buttonsRef} className='InputNumber-Buttons d-flex flex-column position-absolute'>
        <LongPressButton className='InputNumber-Button' onClick={() => onChange(props.value * 1 + 1)} onLongClick={v => onChange(props.value * 1 + v)}><i className='bi bi-caret-up-fill' /></LongPressButton>
        <div className='my-auto'></div>
        <LongPressButton className='InputNumber-Button' onClick={() => onChange(props.value * 1 - 1)} onLongClick={v => onChange(props.value * 1 - v)}><i className='bi bi-caret-down-fill'></i></LongPressButton>
      </div>
    </div>
  );
}

export default InputNumber;