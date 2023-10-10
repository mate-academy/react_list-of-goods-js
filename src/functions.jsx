const goodsFromServer = [
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

export const SORT_FIELD_ALPHABET = 'alphabet';
export const SORT_FIELD_LENGTH = 'length';

export const sortedData = (sortField, reverse) => {
  let data;

  switch (sortField) {
    case SORT_FIELD_ALPHABET:
      data = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
      break;
    case SORT_FIELD_LENGTH:
      data = [...goodsFromServer].sort((a, b) => a.length - b.length);
      break;
    default:
      data = [...goodsFromServer];
  }

  if (reverse) {
    data = data.reverse();
  }

  return data;
};
