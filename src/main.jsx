import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap-icons/font/fonts/bootstrap-icons.woff';

import Container from './Container.jsx';
import NotFound404 from './NotFound404.jsx';

import WebPortfolio from './apps/web-portfolio/components/WebPortfolio.jsx';
import Apps         from './apps/web-portfolio/components/Apps.jsx';
import Games        from './apps/web-portfolio/components/Games.jsx';

import PixelCircle from './apps/pixel-circle/components/PixelCircle.jsx';

import { usePreload as useWebPortfolioPreload } from './apps/web-portfolio/components/preload';
import { usePreload as usePixelCirclePreload }  from './apps/pixel-circle/components/preload';

const router = createHashRouter([
  {
    path: '/',
    errorElement: <NotFound404 />,
    children: [
      {
        path: '/',
        element: <Container preload={useWebPortfolioPreload}><WebPortfolio /></Container>
      },
      {
        path: '/apps',
        element: <Container preload={useWebPortfolioPreload}><Apps /></Container>
      },
      {
        path: '/games',
        element: <Container preload={useWebPortfolioPreload}><Games /></Container>
      },
      {
        path: '/apps/pixel-circle',
        element: <Container preload={usePixelCirclePreload}><PixelCircle /></Container>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);

(function(url) {
  if (window.location.hash === '#/apps/pixel-circle') {
    return;
  }

  const img = new Image();

  img.onload = async function() {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      const base64String = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      console.log(
        '%c ', [
          'padding: 100px 120px',
          `background: url(data:image/gif;base64,${base64String})`,
          'background-size: cover'
        ].join(';')
      );
    } catch (error) {
      console.error("Error converting remote GIF:", error);
    }
  };
  img.crossOrigin='anonymous';
  img.src = url;
})('https://i.giphy.com/Mykt45IfyC6qc.webp');
