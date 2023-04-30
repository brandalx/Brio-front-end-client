import React from 'react';
import { Button, useColorMode } from '@chakra-ui/react';
import theme from '../utils/theme';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header className='page-header' style={{ background: theme.colors[colorMode].bg }}>
      <p>This is header</p>
      <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
    </header>
  );
}
