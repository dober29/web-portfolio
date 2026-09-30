import { useEffect, useRef } from 'react';

import '../css/CustomNumberInput.css';

const LongPressButton = props => {
  const buttonRef     = useRef(null);
  const mainTimerRef  = useRef(null);
  const innerTimerRef = useRef(null);

  const delay = 200;

  const handleMouseDown = () => {
    buttonRef.current.className = 'LongPressButton active';
    props.onClick();

    mainTimerRef.current = setTimeout(() => {
      let v = 1;

      innerTimerRef.current = setInterval(() => {
        props.onLongClick(v++);
      }, 50);
    }, delay);
  };

  const handleMouseUp = () => {
    buttonRef.current.className = 'LongPressButton';
    clearTimeout(mainTimerRef.current);

    if (innerTimerRef.current) {
      clearInterval(innerTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    buttonRef.current.className = 'LongPressButton';
    clearTimeout(mainTimerRef.current);

    if (innerTimerRef.current) {
      clearInterval(innerTimerRef.current);
    }
  };

  const handleTouchStart = (e) => {
    e.preventDefault();

    buttonRef.current.className = 'LongPressButton active';
    props.onClick();

    mainTimerRef.current = setTimeout(() => {
      let v = 1;

      innerTimerRef.current = setInterval(() => {
        props.onLongClick(v++);
      });
    });
  };

  const handleTouchEnd = () => {
    buttonRef.current.className = 'LongPressButton';
    clearTimeout(mainTimerRef.current);

    if (innerTimerRef.current) {
      clearInterval(innerTimerRef.current);
    }
  };

  return (
    <button
      ref={buttonRef}
      type='button'
      className='LongPressButton'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>
      {props.children}
    </button>
  );
};

const CustomNumberInput = props => {
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
    <div className='CustomNumberInput'>
      <input 
        id={props.id} 
        ref={inputRef} 
        className={`CustomNumberInput-Input form-control fs-4${props.className ? ' ' + props.className: ''}`} 
        name={props.name} 
        type='number' 
        min={props.min} 
        max={props.max} 
        value={props.value} 
        onChange={e => onChange(e.target.value)} />
      <div ref={buttonsRef} className='CustomNumberInput-Buttons d-flex flex-column position-absolute'>
        <LongPressButton onClick={() => onChange(props.value * 1 + 1)} 
                         onLongClick={v => onChange(props.value * 1 + v)}>
          <i className='bi bi-caret-up-fill' />
        </LongPressButton>
        <div className='my-auto'></div>
        <LongPressButton onClick={() => onChange(props.value * 1 - 1)} 
                         onLongClick={v => onChange(props.value * 1 - v)}>
          <i className='bi bi-caret-down-fill'></i>
        </LongPressButton>
      </div>
    </div>
  );
}

export default CustomNumberInput;