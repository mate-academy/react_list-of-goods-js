export const getPreparedGoods = (goods, sortField, isReversed) => {
  const goodsCopy = [...goods];

  goodsCopy.sort((a, b) => {
    switch (sortField) {
      case 'Sort alphabetically':
        return a.localeCompare(b);

      case 'Sort by length':
        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};
