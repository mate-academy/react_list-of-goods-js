import { SortTypes } from '../constants/sortTypes';

export const getVisibleGoods = (goods, { sortBy, isReversed }) => {
  let visibleGoods = goods.sort((good1, good2) => {
    switch (sortBy) {
      case SortTypes.ALPHABETICAL:
        return good1.name.localeCompare(good2.name);
      case SortTypes.LENGTH:
        return good1.name.length - good2.name.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return visibleGoods;
};
