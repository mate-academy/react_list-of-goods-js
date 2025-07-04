export default function GoodList({ goodsFromServer }) {
  const listItems = goodsFromServer.map(good => <li data-cy="Good">{good}</li>);

  return <ul>{listItems}</ul>;
}
