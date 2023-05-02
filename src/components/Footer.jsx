import React from 'react';
import { useColorMode } from '@chakra-ui/react';
import theme from '../utils/theme';
export default function Footer() {
  return (
    <footer className='page-header' style={{ background: theme.colors.neutral.bg }}>
      <p>This is sticky footer</p>
    </footer>
  );
}
