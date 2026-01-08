import { GoodsItem } from '../GoodsItem';

export const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodsItem key={good} good={good} />
    ))}
  </ul>
);
