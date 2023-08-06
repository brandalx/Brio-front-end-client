import React from 'react';
import Navbar from './Navbar';

import { Box } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box bg='nuetral.bg' className='page-header' style={{ height: 'auto', zIndex: '9999', paddingBottom: '10px' }}>
      <Navbar />
    </Box>
  );
}
