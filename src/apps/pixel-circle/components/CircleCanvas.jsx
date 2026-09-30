import { useRef, useState, useEffect } from 'react';

import '../css/CircleCanvas.css';

import { minCellSize, defaultCellSize, maxCellSize, cellStrokeWidth } from './Constants';
import bg from '../img/bg.png';
import CircleStats from './CircleStats.jsx';
import StackedComponent from '@common/StackedComponent';

const minScale = minCellSize / defaultCellSize;
const maxScale = maxCellSize / defaultCellSize;

const CircleCanvas = props => {
  const [centerLocation, setCenterLocation] = useState({x: 0, y: 0});
  const mainViewRef = useRef(null);

  const width  = props.segments.width  || 0;
  const height = props.segments.height || 0;

  const circleWidth  = width * defaultCellSize;
  const circleHeight = height * defaultCellSize;

  useEffect(() => {
    if (!(mainViewRef && mainViewRef.current)) {
      return;
    }

    const mainView = mainViewRef.current;
    const mainViewParent = mainView.parentNode;

    const parentRect = mainViewParent.getBoundingClientRect();

    setCenterLocation({
        x: Math.floor(parentRect.width / 2),
        y: Math.floor(parentRect.height / 2)
    });
  }, []);

  useEffect(() => {
    if (!(mainViewRef && mainViewRef.current)) {
      return;
    }

    let scale = 1;

    const mainView = mainViewRef.current;
    const mainViewParent = mainView.parentNode;

    mainViewParent.addEventListener('wheel', e => {
      const newScale = scale - (0.0002 * e.deltaY);
      scale = Math.min(Math.max(minScale, newScale), maxScale);
      mainView.style.transform = `scale(${scale})`;
    });
  }, []);

  useEffect(() => {
    let mouseDown = false;

    let anchorX = 0;
    let anchorY = 0;

    const onMouseDownEvent = () => {
      mouseDown = true;

      anchorX = centerLocation.x;
      anchorY = centerLocation.y;
    }

    const onMouseMoveEvent = e => {
      if (!mouseDown) {
        return;
      }

      anchorX += e.movementX;
      anchorY += e.movementY;

      mainView.style.top  = `${anchorY - circleHeight / 2}px`;
      mainView.style.left = `${anchorX - circleWidth / 2}px`;
    };

    const onMouseUpEvent = () => {
      if (!mouseDown) {
        return;
      }

      mouseDown = false;
      setCenterLocation({x: anchorX, y: anchorY});
    }

    if (!(mainViewRef && mainViewRef.current)) {
      return;
    }

    const mainView = mainViewRef.current;
    const mainViewParent = mainView.parentNode;

    mainViewParent.addEventListener('mousedown', onMouseDownEvent);
    window.addEventListener('mousemove', onMouseMoveEvent);
    window.addEventListener('mouseup', onMouseUpEvent);

    return () => {
      mainViewParent.removeEventListener('mousedown', onMouseDownEvent);
      window.removeEventListener('mousemove', onMouseMoveEvent);
      window.removeEventListener('mouseup', onMouseUpEvent);
    };
  }, [centerLocation, width, height]);

  useEffect(() => {
    const canvas = props.canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (width <= 0 || height <= 0) {
      return;
    }

    ctx.clearRect(0, 0, circleWidth, circleHeight);

    for (let i = 0; i < props.segments.height; i++) {
      for (let j = 0; j < props.segments.width; j++) {
        const seg = props.segments[i];

        if (j < seg.start || j >= seg.end) {
          continue;
        }

        const hidden = j < seg.gapStart || j >= seg.gapEnd;

        ctx.fillStyle   = hidden ? '#0D47A1FF' : '#0D47A133';
        ctx.strokeStyle = '#1A237E';
        ctx.lineWidth   = cellStrokeWidth;

        const x1 = j * defaultCellSize + cellStrokeWidth / 2;
        const y1 = i * defaultCellSize + cellStrokeWidth / 2;

        ctx.fillRect(x1, y1, defaultCellSize, defaultCellSize);

        if (hidden) {
          ctx.strokeRect(x1, y1, defaultCellSize, defaultCellSize);
        }
      }
    }
  }, [width, height, props.blocks, props.canvasRef]);

  return (
    <div className='CircleCanvas w-100 h-100 overflow-hidden' style={{backgroundImage: `url(${bg})`, backgroundSize: `${defaultCellSize * 2}px ${defaultCellSize * 2}px`}}>
      <StackedComponent className='w-100 h-100'>
        <div className='CircleCanvas-Container w-100 h-100 overflow-hidden'>
          <div ref={mainViewRef} className='position-relative' style={{width: circleWidth + cellStrokeWidth, height: circleHeight + cellStrokeWidth, top: centerLocation.y - circleHeight / 2, left: centerLocation.x - circleWidth / 2, transformOrigin: `50% 50%`}}>
            <canvas ref={props.canvasRef} width={circleWidth + cellStrokeWidth} height={circleHeight + cellStrokeWidth}></canvas>
          </div>
        </div>
        <div className='p-2 ms-auto mb-auto' style={{zIndex: 1}}>
          <CircleStats segments={props.segments} />
        </div>
      </StackedComponent>
    </div>
  );
};

export default CircleCanvas;
