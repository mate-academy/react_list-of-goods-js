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
  const data = [...goodsFromServer];

  switch (sortField) {
    case SORT_FIELD_ALPHABET:
      data.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_FIELD_LENGTH:
      data.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverse) {
    data.reverse();
  }

  return data;
};
