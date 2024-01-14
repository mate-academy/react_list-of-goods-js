
export const GoodList = ({ goods }) => (
  goods.map(good => (
    <ul>
      <li data-cy="Good" key={good}>
        {good}
      </li>
    </ul>
  ))
);
