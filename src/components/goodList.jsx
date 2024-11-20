export const GoodList = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
