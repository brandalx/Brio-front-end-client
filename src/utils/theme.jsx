import React, { useEffect, useState } from 'react';
import { extendTheme, ChakraProvider, useColorMode } from '@chakra-ui/react';
import { ColorModeProvider } from '../context/globalContext';
const getUserPreferredColorMode = () => {
  if (localStorage.getItem('colormode')) {
    return localStorage.getItem('colormode');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else {
    return 'light';
  }
};

const ThemeProvider = ({ children }) => {
  const config = {
    initialColorMode: 'light',
    useSystemColorMode: false
  };

  const lightColors = {
    white: '#FFFFFF',
    black: '#000000',
    bg: '#F7F7F9',
    primary: {
      default: '#4E60FF',
      lightest: '#F8F9FF',
      light: '#F3F4FF',
      30: '#CACFFF',
      hover: '#697BFF',
      dark: '#3A4CEB'
    },
    neutral: {
      black: '#2B2B43',
      grayDark: '#545563',
      gray: '#83859C',
      grayLight: '#C7C8D2',
      grayLightest: '#EDEEF2',
      white: '#FFFFFF',
      background: '#F7F7F9'
    },
    error: {
      default: '#FF5C60',
      lightest: '#FFF6F6',
      light: '#FFEAEA',
      hover: '#FF6B6F',
      dark: '#E13E42'
    },
    success: {
      default: '#1ABF70',
      light: '#E8F9F1'
    },
    secondary: {
      default: '#FD6D22',
      light: '#FFF3ED'
    },
    tertiary: {
      default: '#8C3EEE',
      light: '#F6F0FE'
    }
  };

  const darkColors = {
    white: '#202124',
    black: '#FFFFFF',
    bg: '#151515',
    primary: {
      default: '#4E60FF',
      lightest: '#F8F9FF',
      light: '#F3F4FF',
      30: '#CACFFF',
      hover: '#697BFF',
      dark: '#3A4CEB'
    },
    neutral: {
      black: '#FFFFFF',
      grayDark: '#545563',
      gray: '#83859C',
      grayLight: '#C7C8D2',
      grayLightest: '#EDEEF2',
      white: '#2B2B43',
      background: '#F7F7F9'
    },
    error: {
      default: '#FF5C60',
      lightest: '#FFF6F6',
      light: '#FFEAEA',
      hover: '#FF6B6F',
      dark: '#E13E42'
    },
    success: {
      default: '#1ABF70',
      light: '#E8F9F1'
    },
    secondary: {
      default: '#FD6D22',
      light: '#FFF3ED'
    },
    tertiary: {
      default: '#8C3EEE',
      light: '#F6F0FE'
    }
  };

  const letterSpacings = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  };

  const lineHeights = {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: '2'
  };

  const fontWeights = {
    normal: 400,
    semibold: 600,
    bold: 700,
    extrabold: 800
  };

  const fonts = {
    body: 'Nunito, sans-serif',
    heading: 'Nunito, sans-serif',
    mono: 'Menlo, monospace'
  };
  const fontSizes = {
    '3xs': '0.75rem', //12px
    '2.5xs': '0.8125rem', //13px
    '2xs': '0.875rem', //14px
    s: '1rem', //16px
    xs: '1.125rem', //18px
    sm: ' 1.25rem', //20px
    md: '1.5rem', //24px
    lg: '2rem', //32px
    xl: '2.5rem', //40px
    '2xl': '3.75rem' //60px
  };

  const components = {
    Button: {
      defaultProps: {
        size: '2xs',
        variant: '2xs',
        p: '50px'
      },
      sizes: {
        '2xs': {
          h: '30px',
          fontSize: '2xs',
          px: '10px'
        }
      }
    }
  };

  const styles = {
    global: {
      // styles for the `body`
      // styles for the `a`
    }
  };
  // const sizes = {
  //   xl: {
  //     h: '56px',
  //     fontSize: 'lg',
  //     px: '32px',
  //     bg: '#9747FF'
  //   }
  // };

  const [colors, setColors] = useState(lightColors);
  const theme = extendTheme({
    colors,
    config,
    fontSizes,
    fonts,
    fontWeights,
    lineHeights,
    letterSpacings,
    components,
    styles
  });
  const [colorMode, setColorMode] = useState(getUserPreferredColorMode());

  useEffect(() => {
    localStorage.setItem('colormode', colorMode);

    if (colorMode === 'light') {
      setColors(lightColors);
    } else {
      setColors(darkColors);
    }
  }, [colorMode]);

  const handleSystemColorChange = (e) => {
    if (e.matches) {
      setColorMode('dark');
    } else {
      setColorMode('light');
    }
  };
  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    matcher.addListener(handleSystemColorChange);

    return () => {
      matcher.removeListener(handleSystemColorChange);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider value={{ colorMode, setColorMode }}>{children}</ColorModeProvider>
    </ChakraProvider>
  );
};

export default ThemeProvider;
