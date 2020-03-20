import React from 'react';

export const themes = {
  ice: {
    name: 'Gelo',
    background: 'rgb(173, 216, 230, .3)',
    color: '#638080',
  },

  ghost: {
    name: 'Fantasma',
    background: 'rgb(162, 146, 188, .3)',
    color: '#705090',
  }
}

export const ThemeContext = React.createContext(
  themes.ice
)