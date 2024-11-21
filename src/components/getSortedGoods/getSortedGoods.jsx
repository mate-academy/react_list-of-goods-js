export const getSortedGoods = (goods, sortBy, isReverse) => {
  let prepearedGoods = [...goods];

  if (sortBy) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case 'alphabet':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
};
