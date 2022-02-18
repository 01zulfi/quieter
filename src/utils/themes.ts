const secondary = {
  frost: {
    one: '#8FBCBB',
    two: '#88C0D0',
    three: '#81A1C1',
    four: '#5E81AC',
  },
  aurora: {
    one: '#BF616A',
    two: '#D08770',
    three: '#EBCB8B',
    four: '#A3BE8C',
    five: '#B48EAD',
  },
};

const light = {
  ...secondary,
  name: 'light',
  base: {
    one: '#ECEFF4',
    two: '#E5E9F0',
    three: '#D8DEE9',
    four: '#c5ccd9',
  },
  text: {
    one: '#2E3440',
    two: '#3B4252',
    three: '#434C5E',
    four: '#4C566A',
  },
};

const dark = {
  ...secondary,
  name: 'dark',
  base: {
    one: '#2E3440',
    two: '#3B4252',
    three: '#434C5E',
    four: '#4C566A',
  },
  text: {
    one: '#ECEFF4',
    two: '#E5E9F0',
    three: '#D8DEE9',
    four: '#c5ccd9',
  },
};

const theme = {
  light,
  dark,
};

export default theme;
