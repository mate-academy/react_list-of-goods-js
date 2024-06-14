export const GoodProduct = ({ good }) => (
  <li data-cy="Good" key={good.id}>
    {good.name}
  </li>
);
