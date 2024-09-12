export function getPreparedGoods(
  goods,
  { sortField, reverseMethod },
  SORT_FIELD_LENGTH,
  SORT_FIELD_ALPHABETICALLY,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reverseMethod) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}
