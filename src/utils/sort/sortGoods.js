import { SORT_BY_CHAR, SORT_BY_LENGTH } from '../constants';

const sortGoods = (goods, sortType = '', isReverse = false) => {
  if (!sortType && isReverse) return [...goods].reverse();

  const sortedGoods = [...goods].sort((a, b) => {
    switch (sortType) {
      case SORT_BY_CHAR:
        return isReverse ? b.localeCompare(a) : a.localeCompare(b);

      case SORT_BY_LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  return isReverse && sortType === SORT_BY_LENGTH
    ? sortedGoods.reverse()
    : sortedGoods;
};

export default sortGoods;
