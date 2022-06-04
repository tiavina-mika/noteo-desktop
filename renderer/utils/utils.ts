export const truncateString = (str: string, n: number): string => {
  if (str.length > n) {
    return str.substring(0, n) + ' ...';
  }

  return str;
};
