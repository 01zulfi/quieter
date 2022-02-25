const linkColorDecider = (theme: any, highContrast: boolean = false) => {
  if (highContrast) {
    return theme.name === 'light' ? 'black' : 'white';
  }

  return theme.frost.three;
};

export default linkColorDecider;
