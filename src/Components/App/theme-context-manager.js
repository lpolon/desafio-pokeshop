import React, { useState } from 'react';
import themes from './storeThemes';

export const ThemeContext = React.createContext({
  theme: themes.getTheme('ice'),
  // setTheme: () => {},
});

export const ThemeContextProvider = (props) => {
  const handleThemeChange = (themeString) => {
    setTheme({
      theme: themes.getTheme(themeString),
      handleThemeChange,
    });
  };

  const [theme, setTheme] = useState({
    theme: themes.getTheme('ice'),
    handleThemeChange,
  });

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};
