import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const colors = {
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
    black: '#000000',
    grayDark: '#333333',
    gray: '#828282',
    grayLight: '#BDBDBD',
    grayLightest: '#F2F2F2',
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
  xs: '60px',
  sm: '20px',

  md: '32px',

  lg: '40px',

  xl: '24px',

  xxl: '18px'
};

const theme = extendTheme({ colors, config, fontSizes, fonts, fontWeights, lineHeights, letterSpacings });

export default theme;
