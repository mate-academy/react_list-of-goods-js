import { GoodsItem } from '../GoodsItem/GoodsItem';

export const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodsItem good={good} key={good} />
    ))}
  </ul>
);
