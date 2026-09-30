const fillSegments = segments => {
  if (segments.height === 0) {
    return;
  }

  const halfWidth  = segments.width / 2;
  const halfHeight = segments.height / 2;

  for (let i = 0; i < halfHeight; i++) {
    let j = 0;

    for (; j < halfWidth; j++) {
      const x = j + 0.5;
      const y = i + 0.5;

      const radius = Math.pow(x - halfWidth, 2) / Math.pow(halfWidth, 2) + Math.pow(y - halfWidth, 2) / Math.pow(halfWidth, 2);

      if (radius <= 1) {
        break;
      }
    }

    segments[i] = {start: j, end: segments.width - j, gapStart: -1, gapEnd: -1};

    if (halfHeight - i > 1 || halfHeight % 1 == 0) {
      segments[segments.height - i - 1] = {start: j, end: segments.width - j, gapStart: -1, gapEnd: -1};
    }
  }
};

const hideInnerCells = (segments, thickWalls) => {
  const halfHeight = segments.height / 2;

  for (let i = 1; i < halfHeight; i++) {
    const topSeg    = segments[i];
    const bottomSeg = segments[segments.height - i - 1];

    topSeg.gapStart = segments[i - 1].start + (thickWalls ? 1 : 0);
    topSeg.gapEnd   = segments[i - 1].end - (thickWalls ? 1 : 0);

    bottomSeg.gapStart = segments[i - 1].start + (thickWalls ? 1 : 0);
    bottomSeg.gapEnd   = segments[i - 1].end - (thickWalls ? 1 : 0);
  }
};


const buildCircleSegments = (width, height, fill, thickWalls) => {
  const segments = {
    width: width,
    height: height
  };

  fillSegments(segments, width, height);

  if (!fill) {
    hideInnerCells(segments, thickWalls);
  }

  return segments;
};

export default buildCircleSegments;
