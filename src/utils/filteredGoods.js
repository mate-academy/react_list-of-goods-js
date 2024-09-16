export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const SORT_TYPE = {
  SORT_ALPHABET: 'alphabet',
  SORT_LENGTH: 'length',
  RESET: 'reset',
  REVERSE: false,
};

export function filteredGoods(goods, filter, reversed, setFilter) {
  let result = [...goods];

  if (filter === SORT_TYPE.SORT_ALPHABET) {
    result.sort((a, b) => a.localeCompare(b));
  }

  if (filter === SORT_TYPE.SORT_LENGTH) {
    result.sort((a, b) => a.length - b.length);
  }

  if (reversed === true) {
    result = result.reverse();
  }

  if (filter === SORT_TYPE.RESET) {
    result = [...goodsFromServer];
    setFilter('');
  }

  return result;
}
