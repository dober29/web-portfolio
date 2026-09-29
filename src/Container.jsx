const Container = props => {
  props.preload();
  return props.children;
};

export default Container;