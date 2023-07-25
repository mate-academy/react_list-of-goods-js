export function reverseGoods(goods, reversed, setReversed, setGoods) {
  if (!reversed) {
    setReversed(true);
  } else {
    setReversed(false);
  }

  setGoods([...goods].reverse());
}
