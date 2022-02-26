const setBodyBackground = (color: string): void => {
  const { body } = document;
  body.style.cssText = `background: ${color};`;
};

export default setBodyBackground;
