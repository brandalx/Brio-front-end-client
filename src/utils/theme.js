import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const colors = {
  light: {
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
  },
  dark: {
    bg: '#030017',
    primary: {
      default: '#4E60FF',
      lightest: '#F8F9FF',
      light: '#F3F4FF',
      30: '#CACFFF',
      hover: '#1D004E',
      dark: '#3A4CEB'
    },
    neutral: {
      black: '#000000',
      darkblack: '#93A6AE',
      grayDark: '#333333',
      gray: '#828282',
      grayLight: '#BDBDBD',
      grayLightest: '#F2F2F2',
      white: '#FFFFFF',
      darkwhite: '#FDFDFE',
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
  }
};

const theme = extendTheme({ colors, config });

export default theme;
