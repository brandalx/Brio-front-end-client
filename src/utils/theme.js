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
      default: '#cb1bd1',
      lightest: '#525A6D',
      light: '#3A4CEB',
      30: '#8285A9',
      hover: '#CACFFF',
      dark: '#4E60FF'
    },
    neutral: {
      black: '#FFFFFF',
      grayDark: '#E5E5E5',
      gray: '#D9D9D9',
      grayLight: '#BDBDBD',
      grayLightest: '#F2F2F2',
      white: '#030017',
      background: '#1B1C22'
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
      default: '#FFA96A',
      light: '#FFEEDF'
    },
    tertiary: {
      default: '#9B7CFF',
      light: '#ECE7FF'
    }
  }
};

const theme = extendTheme({ colors, config });

export default theme;
