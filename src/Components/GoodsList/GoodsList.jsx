export const GoodsList = ({ goods }) => {
  return goods.map(good => {
    return (
      <li key={good} data-cy="Good">
        {good}
      </li>
    );
  });
};
