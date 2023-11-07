export const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good.id}>{good.name}</li>
    ))}
  </ul>
);
