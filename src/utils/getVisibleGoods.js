export const getVisibleGoods = (
  goods,
  sortType,
  isReversed,
  SORT_BY_FIELDS,
) => {
  const sortedGoods = [...goods];

  if (sortType === SORT_BY_FIELDS.alphabetic) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SORT_BY_FIELDS.length) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};
