import { useEffect } from 'react';

import './NotFound404.css';

const NotFound404 = () => {
  useEffect(() => {
    const head = document.head;

    head.getElementsByTagName('title')[0].innerHTML = '404';

    head.querySelector('link[rel="icon"]').href = favicon;
    head.querySelector('link[rel="apple-touch-icon"]').href = logo192;
  });

  return (
    <div className='NotFound d-flex flex-column vh-100 w-100 justify-content-center align-items-center overflow-hidden'>
      <div className='text-dark fw-bold lh-1' style={{fontSize: '24rem'}}>
        404
      </div>
      <div className='text-dark fs-1 mb-3'>
        Whatever you're looking for, it doesn't exists.
      </div>
      <div>
        <a href='/' className='text-dark fs-1'>Back to main page</a>
      </div>
    </div>
  );
}

export default NotFound404;
