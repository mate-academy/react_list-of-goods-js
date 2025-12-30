export const FoodList = ({ goodsFrom }) => (
  <ul data-cy="Good">
    {goodsFrom.map(goods => (
      <li key={goods} className="Food">
        {goods}
      </li>
    ))}
  </ul>
);
