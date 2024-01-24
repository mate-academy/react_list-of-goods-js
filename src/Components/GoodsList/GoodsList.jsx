import { GoodsCard } from '../GoodsCard';

export const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodsCard good={good} key={good} />
    ))}
  </ul>
);
