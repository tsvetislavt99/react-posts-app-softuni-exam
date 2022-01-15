const AvatarSelect = () => {
  const avatars = [
    'default',
    'astronout',
    'batman',
    'captainamerica',
    'deadpool',
    'anon',
    'einstein',
    'ironman',
    'jacksparrow',
    'loki',
    'spiderman',
    'trooper',
    'manbrownbeard',
    'manbrownbearda',
    'manglasses',
    'manglassesa',
    'womanblackhair',
    'womanblackhaira',
  ];

  return (
    <div className='row-grid-images'>
      <div className='column-grid-images'>
        {avatars.slice(0, 4).map((img) => (
          <img
            alt='avatar'
            className='avatar-select'
            key={img}
            src={`/avatars/${img}.svg`}
          />
        ))}
      </div>
      <div className='column-grid-images'>
        {avatars.slice(4, 9).map((img) => (
          <img
            alt='avatar'
            className='avatar-select'
            key={img}
            src={`/avatars/${img}.svg`}
          />
        ))}
      </div>
      <div className='column-grid-images'>
        {avatars.slice(9, 14).map((img) => (
          <img
            alt='avatar'
            className='avatar-select'
            key={img}
            src={`/avatars/${img}.svg`}
          />
        ))}
      </div>
      <div className='column-grid-images'>
        {avatars.slice(14, 18).map((img) => (
          <img
            alt='avatar'
            className='avatar-select'
            key={img}
            src={`/avatars/${img}.svg`}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarSelect;
