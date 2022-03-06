const setThemeNameInLocalStorage = (themeName: string): void => {
  localStorage.setItem('theme', themeName);
};

const getThemeNameFromLocalStorage = () => localStorage.getItem('theme');

export { setThemeNameInLocalStorage, getThemeNameFromLocalStorage };
