import React, { useEffect, useState } from 'react';
// import dotenv from 'dotenv';
import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './AppRoutes';
import './css/tools/stickyFooter.css';
import theme from './utils/theme';
import './css/tools/fonts.css';
import './css/gallery.css';
import './css/global.css';
import { useCheckToken } from './services/token';

export default function App() {
  const isTokenExpired = useCheckToken();
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    if (isTokenExpired) {
      setIsToken(false);
    } else {
      setIsToken(true);
    }
  }, [isTokenExpired, localStorage]);
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes isToken={isToken} />
    </ChakraProvider>
  );
}
