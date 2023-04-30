import React from 'react';
import theme from '../utils/theme';
import { useColorMode } from '@chakra-ui/react';

export default function Main(props) {
  const { colorMode } = useColorMode();
  //this is for bg of the page should be setted on the top level div of any page component if not chakra component
  // style={{ background: theme.colors[colorMode].bg } //
  return (
    <main className='page-body' style={{ background: theme.colors[colorMode].bg }}>
      {props.children}
    </main>
  );
}
