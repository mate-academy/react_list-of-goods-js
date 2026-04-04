export const GoodList = ({ goods }) => (
  <>
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </>
);
