import { goodsFromServer,
  SORT_METHOD_ALPHABET, SORT_METHOD_LENGTH } from '../../variables/variables';

export function preparedGoodsFn(goods, sortField, reversed) {
  const preparedGoods = [...goodsFromServer];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_METHOD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_METHOD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}
