export function getPreparedGoods(goodsFrom, sortBy, reverseStatus) {
  const goods = [...goodsFrom];

  if (sortBy) {
    goods.sort((good1, good2) => {
      switch (sortBy) {
        case 'name':
          return good1.localeCompare(good2);

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseStatus === 'reversed') {
    return goods.reverse();
  }

  return goods;
}
