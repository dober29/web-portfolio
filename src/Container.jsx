const Container = props => {
  props.usePreload();
  return props.component;
};

export default Container;