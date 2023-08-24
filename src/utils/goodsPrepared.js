import { SORT_BY_ALPHABHET, SORT_BY_LENGTH } from './vars';

export const getPreparedGoods = (goods, { sortField, isReversed }) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case SORT_BY_LENGTH:
          return goods1[sortField] - goods2[sortField];

        case SORT_BY_ALPHABHET:
          return goods1[sortField].localeCompare(goods2[sortField]);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};
