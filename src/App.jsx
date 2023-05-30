import React from 'react';
// import dotenv from 'dotenv';
import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './AppRoutes';
import './css/tools/stickyFooter.css';
import theme from './utils/theme';
import './css/tools/fonts.css';
import './css/gallery.css';
import './css/global.css';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}
