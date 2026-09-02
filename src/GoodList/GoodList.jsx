export const GoodList = ({ goods }) => (
  <>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </>
);
