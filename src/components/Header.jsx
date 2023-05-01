import React from 'react';
import { useColorMode } from '@chakra-ui/react';
import theme from '../utils/theme';

export default function Header(props) {
  const { colorMode } = useColorMode();
  return (
    <header
      className='page-header'
      style={{ background: theme.colors[colorMode].bg, height: 'auto', zIndex: '9999', paddingBottom: '10px' }}
    >
      {props.children}
    </header>
  );
}
