export const GoodList = ({ list }) => (
  <ul>
    {list.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
