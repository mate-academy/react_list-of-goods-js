export const sortByParam = (goods, options) => {
  let arrayResult = [...goods];

  if (options.byAlphabet === 'active') {
    arrayResult = [...goods].sort((a, b) => a.localeCompare(b));
  }

  if (options.byLength === 'active') {
    arrayResult = [...goods].sort((a, b) => a.length - b.length);
  }

  if (options.reverse === 'active') {
    arrayResult.reverse();
  }

  return arrayResult;
};
