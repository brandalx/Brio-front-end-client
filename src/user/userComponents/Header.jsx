import React from 'react';
import Navbar from './Navbar';

import { Box } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box
      bg={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.white' : 'neutral.white')}
      className='page-header'
      style={{ height: 'auto', zIndex: '9999', paddingBottom: '10px' }}
    >
      <Navbar />
    </Box>
  );
}
