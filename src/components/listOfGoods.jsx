export const List = ({ goods }) => {
  return goods.map(good => {
    return (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    );
  });
};
