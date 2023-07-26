export function reverseGoods(goods, reversed, setReversed, setGoods) {
  setReversed(!reversed);

  setGoods([...goods].reverse());
}
