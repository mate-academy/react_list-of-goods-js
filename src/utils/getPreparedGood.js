import { sortFields } from './constants';

export function getPreparedGood(allGoods, { sortField, isReversed }) {
  const visibleGoods = [...allGoods];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case sortFields.ALPHABETIC:
          return good1.name.localeCompare(good2.name);

        case sortFields.BYLENGTH:
          return good1.name.length - good2.name.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}
