import '../css/Card.css';

const Card = props => {
  const links = [];

  for (let i = 0; i < props.item.links.length; i++) {
    const link = props.item.links[i];

    links.push(<a 
      key={i} 
      href={link.url} 
      className='btn btn-outline-primary text-center d-flex flex-row align-items-center' 
      dangerouslySetInnerHTML={{__html: link.label}}
      target='_blank' 
      rel='noreferrer'></a>);
  }

  return (
    <div className='Card d-flex flex-column align-items-center col-12 col-sm-6 col-md-4 mx-auto mb-auto px-2'>
      <div className='d-flex flex-column flex-grow-1 align-items-center col-5 col-sm-12 mb-3'>
        <div className='Logo d-flex pb-2'>
          <img className='my-auto' src={props.item.logo.src} alt={props.item.key + '_item_card'} />
        </div>
        <div className='w-60 d-flex flex-column flex-grow-1 align-items-center'>
          <h3 className='text-center fs-3 fw-medium'>{props.item.title}</h3>
          <p className='text-center fs-5 fw-400 text-justify flex-grow-1'>{props.item.description}</p>
          <div className='d-flex flex-row gap-3'>
            {links}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
