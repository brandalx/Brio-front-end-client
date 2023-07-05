import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const colors = {
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

export default theme;
