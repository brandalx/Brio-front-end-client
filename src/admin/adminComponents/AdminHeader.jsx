import React from 'react';
import AdminNavbar from './AdminNavbar';

import { Box } from '@chakra-ui/react';

export default function AdminHeader() {
  return (
    <Box
      bg={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.white' : 'neutral.white')}
      className='page-header'
      style={{ height: 'auto', zIndex: '1', paddingBottom: '30px' }}
    >
      <AdminNavbar />
    </Box>
  );
}
