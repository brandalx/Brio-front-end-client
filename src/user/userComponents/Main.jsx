import { Box } from '@chakra-ui/react';
import React from 'react';

export default function Main(props) {
  return (
    <Box bg={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.white' : 'neutral.white')}>
      <main className='page-body'>{props.children}</main>
    </Box>
  );
}
