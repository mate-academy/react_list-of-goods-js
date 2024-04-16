export const GoodList = ({ goodsFromServer }) => (
  <ul>
    {goodsFromServer.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
