const AvatarSelect = () => {
  const avatars = [
    'anon',
    'astronout',
    'batman',
    'captainamerica',
    'deadpool',
    'default',
    'einstein',
    'ironman',
    'jacksparrow',
    'loki',
    'manbrownbeard',
    'manbrownbearda',
    'manglasses',
    'manglassesa',
    'spiderman',
    'trooper',
    'womanblackhair',
    'womanblackhaira',
    'womanbloncehair',
  ];

  return (
    <div className='row-grid-images'>
      <div className='column-grid-images'>
        {avatars.slice(0, 4).map((img) => (
          <img key={img} src={`/avatars/${img}.svg`} />
        ))}
      </div>
      <div className='column-grid-images'>
        {avatars.slice(4, 9).map((img) => (
          <img key={img} src={`/avatars/${img}.svg`} />
        ))}
      </div>
      <div className='column-grid-images'>
        {avatars.slice(9, 14).map((img) => (
          <img key={img} src={`/avatars/${img}.svg`} />
        ))}
      </div>
      <div className='column-grid-images'>
        {avatars.slice(14, 18).map((img) => (
          <img key={img} src={`/avatars/${img}.svg`} />
        ))}
      </div>
    </div>
  );
};

export default AvatarSelect;
