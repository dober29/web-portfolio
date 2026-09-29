import favicon from '../public/favicon.ico';
import logo192 from '../public/logo192.png';

import { useRootElementSizing } from '../../../customHooks';
import { useEffect } from 'react';

const usePreload = () => {
  return useEffect(() => {
    document.head.getElementsByTagName('title')[0].innerHTML = 'Pixel Circle Generator';

    document.head.querySelector('link[rel="icon"]').href = favicon;
    document.head.querySelector('link[rel="apple-touch-icon"]').href = logo192;

    useRootElementSizing('8px', 'sm', '9px', 'md', '10px', 'lg', '11px', 'xl', '12px');
  });
};

export { usePreload };