import { useEffect } from 'react';

import favicon from '../public/favicon.ico';
import logo192 from '../public/logo192.png';

const usePreload = () => {
  return useEffect(() => {
    const head = document.head;

    head.getElementsByTagName('title')[0].innerHTML = 'Pixel Circle Generator';

    head.querySelector('link[rel="icon"]').href = favicon;
    head.querySelector('link[rel="apple-touch-icon"]').href = logo192;

    const fontsGoogleApisLink = document.createElement('link');
    fontsGoogleApisLink.rel='preconnect';
    fontsGoogleApisLink.href='https://fonts.googleapis.com';
    
    const fontsGstaticLink = document.createElement('link');
    fontsGstaticLink.rel='preconnect';
    fontsGstaticLink.href='https://fonts.gstatic.com';
    fontsGstaticLink.crossorigin = true;

    const fontLink = document.createElement('link');
    fontLink.rel='stylesheet';
    fontLink.href='https://fonts.googleapis.com/css2?family=Geist+Pixel&display=swap';

    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel='stylesheet';
    fontAwesomeLink.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

    head.appendChild(fontsGoogleApisLink);
    head.appendChild(fontsGstaticLink);
    head.appendChild(fontLink);
    head.appendChild(fontAwesomeLink);

    return () => {
      head.removeChild(fontsGoogleApisLink);
      head.removeChild(fontsGstaticLink);
      head.removeChild(fontLink);
      head.removeChild(fontAwesomeLink);
    };
  });
};

export { usePreload };