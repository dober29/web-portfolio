const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className='d-grid w-100 text-center text-white'>
      <p className='w-100'>
        @dmytro_terekhov, {year}
      </p>
    </div>
  );
};

export default Footer;