import { useRef, useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

import { defaultCellSize, cellStrokeWidth } from './Constants';
import CircleCanvas from './CircleCanvas.jsx';
import CustomNumberInput from './CustomNumberInput.jsx';
import buildCircleSegments from './CircleBuilder';

import '../css/PixelCircle.css';
import { usePreload } from './preload';
import { useRootElementFont, useRootElementSizing } from '@common/customHooks';

const PixelCircleInner = () => {
  const onBind = value => {
    setBind(value);
    setCookie('bind', value, {path: '/', maxAge: 604800});
  };

  const [cookies, setCookie, ] = useCookies(['width', 'height', 'thickWalls', 'fill', 'bind']);

  const [size, setSize]             = useState({width: cookies['width'] || 32, height: cookies['height'] || 32});
  const [thickWalls, setThickWalls] = useState(cookies['thickWalls'] || true);
  const [fill, setFill]             = useState(cookies['fill'] || false);
  const [bind, setBind]             = useState(cookies['bind'] || false);

  const canvasRef = useRef(null);
  const segments    = buildCircleSegments(size.width, size.height, fill, thickWalls);

  const onSaveAsPNGButtonClicked = () => {
    const canvas  = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.download = `circle_${size.width}x${size.height}${(!fill && thickWalls) ? '_thick' : ''}${fill ? '_filled' : ''}.png`;
    link.href = dataUrl;

    link.click();
  };

  const onSaveAsSVGButtonClicked = () => {
    const svgNode = document.createElement('svg');

    svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgNode.setAttribute('width',  segments[0].fullLength * defaultCellSize);
    svgNode.setAttribute('height', segments.length * defaultCellSize);

    const svgDefs = document.createElement('defs');

    const visibleBlockRect = document.createElement('rect');
    const hiddenBlockRect  = document.createElement('rect');

    visibleBlockRect.setAttribute('id',          'visible');
    visibleBlockRect.setAttribute('width',        defaultCellSize);
    visibleBlockRect.setAttribute('height',       defaultCellSize);
    visibleBlockRect.setAttribute('fill',         '#0D47A1');
    visibleBlockRect.setAttribute('stroke',       '#1A237E');
    visibleBlockRect.setAttribute('stroke-width', cellStrokeWidth);

    hiddenBlockRect.setAttribute('id',           'hidden');
    hiddenBlockRect.setAttribute('width',        defaultCellSize);
    hiddenBlockRect.setAttribute('height',       defaultCellSize);
    hiddenBlockRect.setAttribute('fill',         '#0D47A133');
    hiddenBlockRect.setAttribute('stroke-width', 0);

    svgNode.appendChild(svgDefs);
    svgDefs.appendChild(visibleBlockRect);
    svgDefs.appendChild(hiddenBlockRect);

    for (let i = 0; i < segments.height; i++) {
      for (let j = 0; j < segments.width; j++) {
        if (j < segments[i].start || j >= segments[i].end) {
          continue;
        }

        const hidden = j < segments[i].gapStart || j >= segments[i].gapEnd;

        const r = document.createElement('use');

        r.setAttribute('x', j * defaultCellSize);
        r.setAttribute('y', i * defaultCellSize);
        r.setAttribute('href', hidden ? '#visible' : '#hidden');

        svgNode.appendChild(r);
      }
    }

    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(svgNode.outerHTML)}`;
    link.download = `circle_${size.width}x${size.height}${(!fill && thickWalls) ? '_thick' : ''}${fill ? '_filled' : ''}.svg`;
    link.click();
  };

  usePreload();
  useRootElementSizing('8px', 'sm', '9px', 'md', '10px', 'lg', '11px', 'xl', '12px');
  useRootElementFont('"Geist Pixel", sans-serif');

  return (
    <div className='PixelCircle d-flex vw-100 vh-100'>
      <div className='side d-flex flex-column px-3 py-4'>
        <h1 className='mx-auto fw-semibold'>Pixel Circle Generator</h1>
        <hr className='col-4 mx-auto my-3 color-primary' />
        <div className='d-flex flex-row justify-content-center my-3'>
          <div className='col-3'>
            <label htmlFor='widthInput' className='fs-6 text-primary'>
              Width
            </label>
            <CustomNumberInput id='widthInput' className={size.height < 1 ? 'border-danger': ''} name='widthInput' min={1} value={size.width} onChange={v => {
              const newSize = {
                width: v * 1,
                height: bind ? v * 1 : size.height
              };

              setSize(newSize);

              setCookie('width',  newSize.width,  {path: '/', maxAge: 604800});
              setCookie('height', newSize.height, {path: '/', maxAge: 604800});
            }} />
          </div>
          <div className='mx-1 mt-4 align-self-center'>
            <button onClick={() => onBind(!bind)} className='btn btn-sm p-0 fs-4' style={{width: 24}}>
              <i className={`fa ${bind ? 'fa-lock' : 'fa-unlock'}`} aria-hidden='true'></i>
            </button>
          </div>
          <div className='col-3'>
            <label htmlFor='heightInput' className='fs-6 text-primary'>
              Height
            </label>
            <CustomNumberInput id='heightInput' className={size.height < 1 ? 'border-danger': ''} name='heightInput' min={1} value={size.height} onChange={v => {
              const newSize = {
                width: bind ? v : size.width,
                height: v * 1
              };

              setSize(newSize);

              setCookie('width',  newSize.width,  {path: '/', maxAge: 604800});
              setCookie('height', newSize.height, {path: '/', maxAge: 604800});
            }} />
          </div>
        </div>
        <div className='d-flex flex-row mx-auto my-3'>
          <div className='form-check fs-4'>
            <input id='fillCheckbox' className='form-check-input' type='checkbox' name='fillCheckbox' checked={fill} onChange={e => {
              setFill(e.target.checked);
              setCookie('fill', e.target.checked, {path: '/', maxAge: 604800});
            }} />
            <label className='form-check-label text-primary fw-semibold' htmlFor='fillCheckbox'>
              Fill
            </label>
          </div>
          <div className='mx-3'></div>
          <div className='form-check fs-4'>
            <input id='thickWallsCheckbox' className='form-check-input' type='checkbox' name='thickWallsCheckbox' checked={thickWalls} disabled={fill} onChange={e => {
              setThickWalls(e.target.checked);
              setCookie('thickWalls', e.target.checked, {path: '/', maxAge: 604800});
            }} />
            <label className='form-check-label text-primary fw-semibold' htmlFor='thickWallsCheckbox'>
              Thick walls
            </label>
          </div>
        </div>
        <hr className='col-4 mx-auto my-3' />
        <div className='d-flex flex-row mx-auto my-3'>
          <button className='btn btn-outline-secondary fs-4 fw-semibold' onClick={onSaveAsPNGButtonClicked}>
            Save as png
            </button>
            <div className='mx-2'></div>
            <button className='btn btn-outline-secondary fs-4 fw-semibold' onClick={onSaveAsSVGButtonClicked}>
              Save as svg
            </button>
          </div>
          <hr className='col-4 mx-auto my-3' />
          <div className='my-auto'></div>
          <div className='mx-auto fw-semibold'>
            <span className='text-primary'>Made by </span><a href='/'>Dmytro Terekhov</a><span className='text-primary'>, 2026</span>
          </div>
        </div>
      <CircleCanvas canvasRef={canvasRef} segments={segments} />
    </div>
  );
}

const PixelCircle = () => {
  return (
    <CookiesProvider>
      <PixelCircleInner />
    </CookiesProvider>
  );
};

export default PixelCircle;
