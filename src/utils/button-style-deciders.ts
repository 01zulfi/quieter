const backgroundDecider = (status: string, theme: any) => {
  if (status === 'primary') {
    return theme.frost.two;
  }
  if (status === 'secondary') {
    return 'transparent';
  }
  if (status === 'red') {
    return theme.aurora.one;
  }
  return 'transparent';
};

const colorDecider = (status: string, theme: any) => {
  if (status === 'primary') {
    return '#2E3440';
  }
  if (status === 'secondary') {
    return theme.text.three;
  }
  if (status === 'red') {
    return theme.text.one;
  }
  return theme.text.one;
};

const outlineDecider = (status: string, theme: any) => {
  if (status === 'secondary') {
    return `2px solid ${theme.text.four}`;
  }
  return '0';
};

const hoverBackgroundDecider = (status: string, theme: any) => {
  if (status === 'primary') {
    return theme.frost.three;
  }
  if (status === 'secondary') {
    return 'transparent';
  }
  if (status === 'red') {
    return theme.aurora.one;
  }
  return 'transparent';
};

const hoverColorDecider = (status: string, theme: any) => {
  if (status === 'primary') {
    return 'white';
  }
  if (status === 'secondary') {
    return theme.frost.two;
  }
  if (status === 'red') {
    return theme.text.one;
  }
  return theme.text.one;
};

const hoverOutlineDecider = (status: string, theme: any) => {
  if (status === 'secondary') {
    return `2px solid ${theme.frost.two}`;
  }
  if (status === 'red') {
    return `2px solid ${theme.text.two}`;
  }
  return '0';
};

export {
  backgroundDecider,
  colorDecider,
  outlineDecider,
  hoverBackgroundDecider,
  hoverColorDecider,
  hoverOutlineDecider,
};
