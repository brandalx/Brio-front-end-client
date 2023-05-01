import React from 'react';

import theme from '../utils/theme';

export default function Header(props) {
  return (
    <header
      className='page-header'
      style={{ background: theme.colors.bg, height: 'auto', zIndex: '9999', paddingBottom: '10px' }}
    >
      {props.children}
    </header>
  );
}
