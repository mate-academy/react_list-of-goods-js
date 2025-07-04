export default function GoodList({ goodsFromServer }) {
  const listItems = goodsFromServer.map(good => (
    <li data-cy="Good" key={good}>
      {good}
    </li>
  ));

  return <ul>{listItems}</ul>;
}
