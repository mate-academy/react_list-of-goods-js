export function sortBy(goods, field, reverseGoods) {
  const copyGoods = [...goods];

  switch (field) {
    case 'ASC':
      copyGoods.sort((a, b) => a.localeCompare(b));
      break;
    case 'length':
      copyGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  return reverseGoods ? copyGoods.reverse() : copyGoods;
}
