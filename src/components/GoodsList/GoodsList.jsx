import { GoodsCard } from '../GoodsCard/GoodsCard';

export const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodsCard key={good} good={good} />
    ))}
  </ul>
);
