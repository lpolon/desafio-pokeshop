export default {
  ice: {
    id: 'ice',
    name: 'Gelo',
    background: 'rgb(173, 216, 230, .3)',
    color: '#638080',
  },

  ghost: {
    id: 'ghost',
    name: 'Fantasma',
    background: 'rgb(162, 146, 188, .3)',
    color: '#705090',
  },

  getTheme(string) {
    return this[string];
  },
};