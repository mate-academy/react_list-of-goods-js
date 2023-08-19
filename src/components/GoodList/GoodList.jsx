import { GoodCart } from '../GoodCart/GoodCart';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCart good={good} key={good.id} />
    ))}
  </ul>
);
