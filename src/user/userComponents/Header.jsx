import React from 'react';
import Navbar from './Navbar';
import theme from '../../utils/theme';

export default function Header() {
  return (
    <header
      className='page-header'
      style={{ background: theme.colors.neutral.bg, height: 'auto', zIndex: '9999', paddingBottom: '10px' }}
    >
      <Navbar />
    </header>
  );
}
