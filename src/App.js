import React from 'react';
import AppRoutes from './AppRoutes';
import { ChakraProvider } from '@chakra-ui/react';
import './css/tools/stickyFooter.css';
import theme from './utils/theme';
export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}
