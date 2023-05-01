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
  fonts: {
    body: 'Nunito, sans-serif',
    heading: 'Nunito, sans-serif',
    mono: 'Menlo, monospace'
  }
};
const fontSizes = {
  h1: {
    size: '11px',
    lineHeight: '82px',
    letterSpacing: '0.1px',
    fontWeight: 'bold'
  },
  h2: {
    size: '40px',
    lineHeight: '56px',
    letterSpacing: '0.1px',
    fontWeight: 'extrabold'
  },
  h3: {
    size: '32px',
    lineHeight: '42px',
    letterSpacing: '0.1px',
    fontWeight: 'bold'
  },
  h4: {
    size: '24px',
    lineHeight: '32px',
    letterSpacing: '0.1px',
    fontWeight: 'extrabold'
  },
  h5: {
    size: '20px',
    lineHeight: '28px',
    letterSpacing: '0.1px',
    fontWeight: 'semibold'
  },
  h6: {
    size: '18px',
    lineHeight: '24px',
    letterSpacing: '0.1px',
    fontWeight: 'bold'
  },
  subtitle1: {
    size: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
    fontWeight: 'bold'
  },
  subtitle2: {
    size: '13px',
    lineHeight: '18px',
    letterSpacing: '0px',
    fontWeight: 'semibold'
  },
  body1: {
    size: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
    fontWeight: 'normal'
  },
  body2: {
    size: '13px',
    lineHeight: '18px',
    letterSpacing: '0.2px',
    fontWeight: 'normal'
  },
  small1: {
    size: '13px',
    lineHeight: '18px',
    letterSpacing: '0.1px',
    fontWeight: 'bold'
  },
  small2: {
    size: '12px',
    lineHeight: '16px',
    letterSpacing: '0px',
    fontWeight: 'semibold'
  },
  small3: {
    size: '10px',
    lineHeight: '14px',
    letterSpacing: '0px',
    fontWeight: 'bold'
  },
  button1: {
    size: '14px',
    lineHeight: '20px',
    letterSpacing: '0.4px',
    fontWeight: 'bold'
  },
  button2: {
    size: '12px',
    lineHeight: '18px',
    letterSpacing: '0.6px',
    fontWeight: 'extrabold'
  },
  caption: {
    size: '11px',
    lineHeight: '16px',
    letterSpacing: '0.6px',
    fontWeight: 'bold'
  }
};

const theme = extendTheme({ colors, config, fontSizes, fonts, fontWeights, lineHeights, letterSpacings });

export default theme;
