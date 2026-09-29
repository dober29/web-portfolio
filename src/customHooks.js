import { useEffect } from 'react';

const sizes = {
  'sm': '576px',
  'md': '768px',
  'lg': '992px',
  'xl': '1200px',
  'xxl': '1400px'
};

const useRootElementSizing = (...props) => {
  const components = [];

  let i = 0;

  if (typeof props[0] === 'string') {
    components.push(`:root{font-size: ${props[0]}}`);
    i++;
  }

  for (; i < props.length; i += 2) {
    if (props[i] in sizes) {
      components.push(`@media screen and (min-width:${sizes[props[i]]}){:root{font-size:${props[i + 1]};}}`);
    }
  }

  return useEffect(() => {
    const headElement = document.documentElement.firstChild;

    const rootStyleChild = document.createElement('style');
    rootStyleChild.innerHTML = components.join('');

    headElement.appendChild(rootStyleChild);

    return () => {
      headElement.removeChild(rootStyleChild);
    };
  });
};

const useElementSizing = (...props) => {
  const components = [];

  let i = 0;

  if (typeof props[0] === 'string') {
    components.push(`:root{font-size: ${props[0]}}`);
    i++;
  }

  for (; i < props.length; i += 2) {
    if (props[i] in sizes) {
      components.push(`@media screen and (min-width:${sizes[props[i]]}){:root{font-size:${props[i + 1]};}}`);
    }
  }

  return useEffect(() => {
    const headElement = document.documentElement.firstChild;

    const rootStyleChild = document.createElement('style');
    rootStyleChild.innerHTML = components.join('');

    headElement.appendChild(rootStyleChild);

    return () => {
      headElement.removeChild(rootStyleChild);
    };
  });
};

const useRootElementFont = (fontFamily, fontWeight = 400, fontStyle = 'normal') => {
  return useEffect(() => {
    const headElement = document.documentElement.firstChild;

    const rootStyleChild = document.createElement('style');
    rootStyleChild.innerHTML = `
      :root{
        font-family: ${fontFamily};
        font-weight: ${fontWeight};
        font-style: ${fontStyle}
      }`;

    headElement.appendChild(rootStyleChild);

    return () => {
      headElement.removeChild(rootStyleChild);
    };
  });
};

export { useRootElementSizing, useRootElementFont };