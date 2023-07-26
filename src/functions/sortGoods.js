import { ALPHABET, NO_SORT, LENGTH } from '../constances';

export function sortGoods(
  sortBy,
  setSortBy,
  setReversed,
  setGoods,
  originalGoods,
  reversed,
) {
  switch (sortBy) {
    case NO_SORT:
      setReversed(false);
      setGoods(originalGoods);
      setSortBy(NO_SORT);
      break;
    case ALPHABET: {
      setSortBy(ALPHABET);
      const sortedGoods = originalGoods.sort(
        (good1, good2) => good1.localeCompare(good2),
      );

      setGoods(reversed ? sortedGoods.reverse() : sortedGoods);
      break;
    }

    case LENGTH: {
      setSortBy(LENGTH);
      const sortedGoods = originalGoods.sort(
        (good1, good2) => good1.length - good2.length,
      );

      setGoods(reversed ? [...sortedGoods].reverse() : [...sortedGoods]);
      break;
    }

    default:
      break;
  }
}
