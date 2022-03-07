const localDateFromMilliseconds = (milliseconds: number): string => {
  const date = new Date(milliseconds);
  return date.toLocaleString();
};

export default localDateFromMilliseconds;
