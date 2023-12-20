import { GoodsCard } from '../GoodsCard/GoodsCard';

export const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodsCard good={good} />
    ))}
  </ul>
);
