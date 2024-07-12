import { constant } from './constants';

export const getPreparedGoods = (goods, sortBy, isReversed) => {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case constant.ALPHABET:
          return good1.localeCompare(good2);
        case constant.LENGTH:
          return good1.length - good2.length;

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
