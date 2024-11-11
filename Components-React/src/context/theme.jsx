
import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const getCookie = (name) => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
};

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

const deleteCookie = (name) => {
  document.cookie = name + '=; Max-Age=0; path=/';
};

export const ThemeProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#007AFF');
  const [secondaryColor, setSecondaryColor] = useState('#062C62');
  const [textColor, setTextColor] = useState('#000000');
  const [iconColor, setIconColor] = useState('#007AFF');

  useEffect(() => {
    const savedPrimaryColor = getCookie('primaryColor');
    const savedSecondaryColor = getCookie('secondaryColor');
    const savedTextColor = getCookie('textColor');
    const savedIconColor = getCookie('iconColor');

    if (savedPrimaryColor) setPrimaryColor(savedPrimaryColor);
    if (savedSecondaryColor) setSecondaryColor(savedSecondaryColor);
    if (savedTextColor) setTextColor(savedTextColor);
    if (savedIconColor) setIconColor(savedIconColor);

    updateCSSVariables();
  }, []);

  useEffect(() => {
    updateCSSVariables();
  }, [primaryColor, secondaryColor, textColor, iconColor]);

  const updateCSSVariables = () => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    document.documentElement.style.setProperty('--body-text-color', textColor);
    document.documentElement.style.setProperty('--primary-color-icon', iconColor);
  };

  const saveColorsToCookies = () => {
    setCookie('primaryColor', primaryColor, 365);
    setCookie('secondaryColor', secondaryColor, 365);
    setCookie('textColor', textColor, 365);
    setCookie('iconColor', iconColor, 365);
  };

  const resetColors = () => {
    deleteCookie('primaryColor');
    deleteCookie('secondaryColor');
    deleteCookie('textColor');
    deleteCookie('iconColor');
    setPrimaryColor('#007AFF');
    setSecondaryColor('#062C62');
    setTextColor('#000000');
    setIconColor('#007AFF');
  };

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        textColor,
        setTextColor,
        iconColor,
        setIconColor,
        saveColorsToCookies,
        resetColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
