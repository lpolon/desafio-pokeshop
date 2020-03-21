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
  normal: {
    id: 'normal',
    name: 'Normal',
    // lalala
    background: 'rgb(168, 168, 120, .3)',
    color: '#705090',
  },
  fighting: {
    id: 'fighting',
    name: 'Lutador',
    background: 'rgb(162, 146, 188, .3)',
    color: '#6D6D4E',
  },
  flying: {
    id: 'flying',
    name: 'Voador',
    background: 'rgb(168, 144, 240, .3)',
    color: '#6D5E9C',
  },
  poison: {
    id: 'poison',
    name: 'Venonoso',
    background: 'rgb(160, 64, 160, .3)',
    color: '#682A68',
  },
  ground: {
    id: 'ground',
    name: 'Terra',
    background: 'rgb(224, 192, 104, .3)',
    color: '#927D44',
  },
  rock: {
    id: 'rock',
    name: 'Pedra',
    background: 'rgb(184, 160, 56, .3)',
    color: '#786824',
  },
  bug: {
    id: 'bug',
    name: 'Inseto',
    background: 'rgb(168, 184, 32, .3)',
    color: '#6D7815',
  },
  steel: {
    id: 'steel',
    name: 'Metálico',
    background: 'rgb(184, 184, 208, .6)',
    color: '#787887',
  },
  fire: {
    id: 'fire',
    name: 'Fogo',
    background: 'rgb(240, 128, 48, .3)',
    color: '#9C531F',
  },
  water: {
    id: 'water',
    name: 'Água',
    background: 'rgb(104, 144, 240, .3)',
    color: '#4E8234',
  },
  grass: {
    id: 'grass',
    name: 'Planta',
    background: 'rgb(120, 200, 80, .3)',
    color: '#4E8234',
  },
  electric: {
    id: 'electric',
    name: 'Elétrico',
    background: 'rgb(248, 208, 48, .6)',
    color: '#A1871F',
  },
  psychic: {
    id: 'psychic',
    name: 'Psíquico',
    background: 'rgb(248, 88, 136, .4)',
    // A1871F
    color: '#A13959',
  },
  dragon: {
    id: 'dragon',
    name: 'Dragão',
    background: 'rgb(112, 56, 248, .3)',
    // A13959
    color: '#4924A1',
  },
  dark: {
    id: 'dark',
    name: 'Noturno',
    background: 'rgb(112, 88, 72, .3)',
    color: '#49392F',
  },
  fairy: {
    id: 'fairy',
    name: 'Fada',
    background: 'rgb(238, 153, 172, .5)',
    color: '#9B6470',
  },

  getTheme(string) {
    return this[string];
  },
};
