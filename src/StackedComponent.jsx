import './StackedComponent.css';

const StackedComponent = props => {
  let className = props.className || '';

  if (className.length) {
    className = ' ' + className;
  }

  return (
    <div ref={props.cRef} className={`StackedComponent${className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default StackedComponent;
