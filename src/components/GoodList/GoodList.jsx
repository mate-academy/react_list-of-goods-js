export const GoodLIst = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good">{good}</li>
    ))}
  </ul>
);
