
export const GoodList = ({ goods }) => (
  goods.map(good => (
    <li key={good}>
      {good}
    </li>
  ))
);
