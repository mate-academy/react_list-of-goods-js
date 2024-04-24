import { CONDITION } from '../constants';

export function prepareGoods(goods, condition, reversed) {
  const preparedGoods = [...goods];

  if (condition === CONDITION.ALPHABET) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (condition === CONDITION.LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}
