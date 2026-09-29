import { useRootElementSizing, useRootElementFont } from '@common/customHooks';

import '../css/WebPortfolio.css';

const WebPortfolio = () => {
  useRootElementSizing('10px', 'sm', '12px', 'md', '14px', 'lg', '16px', 'xl', '20px', 'xxl', '24px');
  useRootElementFont("'Outfit', sans-serif");

  return (
    <div className="WebPortfolio vw-100 vh-100 d-flex">
      <div className='col-7 col-sm-6 m-auto'>
        <h1 className='fw-bold text-white'>Dmytro Terekhov</h1>
        <div className='d-flex flex-row justify-content-between align-items-center fs-5 w-100'>
          <div className='d-flex flex-row'>
            <a href='/#/apps'>
              <p className='m-0'>Apps & Tools</p>
            </a>
            <div className='mx-2'></div>
            <a href='/#/games'>
              <p className='m-0'>Games</p>
            </a>
            <div className='mx-2'></div>
            <a href='/#/blog'>
              <p className='m-0'>Blog</p>
            </a>
          </div>
          <div className='d-flex flex-row'>
            <a href='https://github.com/dododo25' target='_blank' rel='noreferrer'>
              <p className='m-0'><i className='fa fa-brands fa-github fs-4'></i></p>
            </a>
            <div className='mx-2'></div>
            <a href='https://www.linkedin.com/in/dmytro-terekhov-ab2872106' target='_blank' rel='noreferrer'>
              <p className='m-0'><i className='fa fa-brands fa-linkedin fs-4'></i></p>
            </a>
            <div className='mx-2'></div>
            <a href='mailto:dmytro.terekhov@outlook.com' target='_blank' rel='noreferrer'>
              <p className='m-0'><i className='fa fa-envelope fs-4'></i></p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebPortfolio;
