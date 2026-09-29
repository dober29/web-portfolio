import { useRootElementSizing } from '@common/customHooks';

import Card from './Card.jsx';
import Header from './Header.jsx';

const Page = props => {
  const cards = [];

  for (let i = 0; i < props.data.length; i++) {
    cards.push(<Card key={i} item={props.data[i]} />);
  }

  let content;

  if (props.data.length === 0) {
    content = (<span className='m-auto text-white' style={{fontSize: '6rem'}}>Coding soon :)</span>);
  } else {
    content = (<div className='container d-flex flex-wrap text-white'>{cards}</div>);
  }

  useRootElementSizing('10px', 'sm', '12px', 'md', '12px', 'lg', '13px', 'xl', '14px', 'xxl', '16px');

  return (
    <div className="WebPortfolio d-flex flex-column  min-vh-100 overflow-hidden">
      <Header />
      <div className='d-flex flex-grow-1 mb-4' style={{paddingTop: '3.6rem'}}>
        {content}
      </div>
    </div>
  );
}

export default Page;
