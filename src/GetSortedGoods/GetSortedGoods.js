import { SortType } from '../SortButtons/SortButtons';

export const getSortedGoods = (goods, sortType, isReversed) => {
  const sorted = [...goods];

  if (sortType === SortType.Alphabetically) {
    sorted.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.ByLength) {
    sorted.sort((a, b) => a.length - b.length || a.localeCompare(b));
  }

  if (isReversed) {
    sorted.reverse();
  }

  return sorted;
};
