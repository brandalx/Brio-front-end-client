import React from 'react';
import AppRoutes from './AppRoutes';
import { ChakraProvider } from '@chakra-ui/react';
export default function App() {
  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  );
}
