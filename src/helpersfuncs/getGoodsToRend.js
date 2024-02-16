
export function getGoodsToRend(goods, field, reverseState) {
  const goodsToRend = [...goods];
  const ACTION_FIELD_ALPHABET = 'Sort alphabetically';
  const ACTION_FIELD_LENGTH = 'Sort by length';

  if (field) {
    goodsToRend.sort((good1, good2) => {
      switch (field) {
        case ACTION_FIELD_ALPHABET:

          return good1.name.localeCompare(good2.name);
        case ACTION_FIELD_LENGTH:

          return good1.name.length - good2.name.length;
        default:
          return 0;
      }
    });
  }

  if (reverseState) {
    goodsToRend.reverse();
  }

  return goodsToRend;
}
