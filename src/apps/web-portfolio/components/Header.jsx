import { useEffect, useRef } from 'react';

const Header = () => {
  const headerRef = useRef();

  useEffect(() => {
    const headerElem = headerRef.current;
    const hash = document.location.hash;

    if (hash.endsWith('/apps')) {
      headerElem.children[0].firstChild.className = 'nav-link active';
    } else if (hash.endsWith('/games')) {
      headerElem.children[1].firstChild.className = 'nav-link active';
    } else if (hash.endsWith('/blog')) {
      headerElem.children[2].firstChild.className = 'nav-link active';
    }
  }, []);

  return ([
    <div key={0} id='WebPortfolioOffcanvas' className='offcanvas offcanvas-start w-40 px-3' tabIndex='-1' data-bs-theme='dark' aria-labelledby='WebPortfolioOffcanvasLabel' style={{width: '320px'}}>
      <div className='offcanvas-header'>
        <h5 className='offcanvas-title fs-3' id='WebPortfolioOffcanvasLabel'>dmytro.terekhov</h5>
        <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
      </div>
      <div className='offcanvas-body'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a className='nav-link fs-5' href='/'>home</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link fs-5' href='/#/apps'>apps & tools</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link fs-5' href='/#/games'>games</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link fs-5' href='/#/blog'>blog</a>
          </li>
        </ul>
      </div>
    </div>,
    <nav key={1} className='navbar navbar-expand-lg fixed-top' data-bs-theme='dark'>
      <div className='container-fluid w-auto'>
        <div className='d-flex flex-row align-items-center'>
          <a className='nav-link' href='/#'>
            <span className='navbar-brand'>dmytro.terekhov</span>
          </a>
          <button className='navbar-toggler' type='button' data-bs-toggle='offcanvas' data-bs-target='#WebPortfolioOffcanvas' aria-controls='WebPortfolioOffcanvas' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
        </div>
        <div className='collapse navbar-collapse'>
          <ul ref={headerRef} className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link' href='/#/apps'>apps & tools</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/#/games'>games</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/#/blog'>blog</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  ]);
};

export default Header;
