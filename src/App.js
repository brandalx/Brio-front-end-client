import React from 'react';
import AppRoutes from './AppRoutes';
import { ChakraProvider } from '@chakra-ui/react';
import './css/tools/stickyFooter.css';
export default function App() {
  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  );
}
