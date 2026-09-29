import { useRef, useState, useEffect } from 'react';
import { minCellSize, defaultCellSize, maxCellSize, cellStrokeWidth } from './Constants';

import bg from '../img/bg.png';

const minScale = minCellSize / defaultCellSize;
const maxScale = maxCellSize / defaultCellSize;

const CircleCanvas = props => {
  const [centerLocation, setCenterLocation] = useState({x: 0, y: 0});
  const mainViewRef = useRef(null);

  const width  = props.blocks[0].length || 0;
  const height = props.blocks.length    || 0;

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
  }, [centerLocation, circleWidth, circleHeight]);

  useEffect(() => {
    const canvas = props.canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (circleWidth <= 0 || circleHeight <= 0) {
      return;
    }

    ctx.clearRect(0, 0, circleWidth, circleHeight);

    for (let i = 0; i < props.blocks.length; i++) {
      for (let j = 0; j < props.blocks[i].length; j++) {
        const cell = props.blocks[i][j];

        if (cell === undefined) {
          continue;
        }

        ctx.fillStyle   = cell ? '#0D47A1FF' : '#0D47A133';
        ctx.strokeStyle = '#1A237E';
        ctx.lineWidth   = cellStrokeWidth;

        const x1 = j * defaultCellSize + cellStrokeWidth / 2;
        const y1 = i * defaultCellSize + cellStrokeWidth / 2;

        ctx.fillRect(x1, y1, defaultCellSize, defaultCellSize);

        if (cell) {
          ctx.strokeRect(x1, y1, defaultCellSize, defaultCellSize);
        }
      }
    }
  }, [circleWidth, circleHeight, props.blocks, props.canvasRef]);

  return (
    <div className='w-100 h-100 overflow-hidden' style={{backgroundImage: `url(${bg})`, backgroundSize: `${defaultCellSize * 2}px ${defaultCellSize * 2}px`}}>
      <div ref={mainViewRef} className='position-relative' style={{width: circleWidth, height: circleHeight, top: centerLocation.y - circleHeight / 2, left: centerLocation.x - circleWidth / 2, transformOrigin: `50% 50%`}}>
        <canvas ref={props.canvasRef} width={circleWidth + cellStrokeWidth} height={circleHeight + cellStrokeWidth}></canvas>
      </div>
    </div>
  );
};

export default CircleCanvas;
