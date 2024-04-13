export const Table = ({ goods }) =>
  goods.map(good => <li data-cy="Good">{good}</li>);
