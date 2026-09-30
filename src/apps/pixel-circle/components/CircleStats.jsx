import { useEffect, useState } from 'react';

import '../css/CircleStats.css';

const CircleStats = props => {
  const [totalNumber, setTotalNumber] = useState(0);

  useEffect(() => {
    let c = 0;

    for (let i = 0; i < props.segments.height; i++) {
        c += props.segments[i].end - props.segments[i].start;
    }

    setTotalNumber(c);
  }, [props.segments]);

  const stacksOf64 = Math.ceil(totalNumber / 64);
  const stacksOf16 = Math.ceil(totalNumber / 16);

  return (
    <div className='CircleStats d-flex flex-column p-1'>
      <span className='text-white fs-5'>Number of blocks: {totalNumber}</span>
      <span className='text-white fs-5'>Stacks of 64: {stacksOf64}</span>
      <span className='text-white fs-5'>Stacks of 16: {stacksOf16}</span>
    </div>
  );
};

export default CircleStats;
