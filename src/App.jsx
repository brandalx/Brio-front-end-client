import React, { useEffect, useState } from 'react';
// import dotenv from 'dotenv';
import { Button, ChakraProvider, useColorMode } from '@chakra-ui/react';
import AppRoutes from './AppRoutes';
import './css/tools/stickyFooter.css';

import './css/tools/fonts.css';
import './css/gallery.css';
import './css/global.css';
import { useCheckToken } from './services/token';
import Aos from 'aos';
import ThemeProvider from './utils/theme';

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
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <ThemeProvider>
      <AppRoutes isToken={isToken} />
    </ThemeProvider>
  );
}
