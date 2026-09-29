import { useRef } from 'react';

import '../css/LongPressButton.css';

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

export default LongPressButton;
