import { createContext } from 'react';
import React from 'react';
export const globalContext = createContext(null);
export const cartContext = createContext(null);
export const avatarContext = createContext(null);
export const geolocationContext = createContext(null);
const ColorModeContext = React.createContext();

export const ColorModeProvider = ColorModeContext.Provider;
export const useColorModeContext = () => React.useContext(ColorModeContext);
