import { GoodItem } from '../GoodsItem/GoodsItem';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodItem good={good} key={good} />
    ))}
  </ul>
);
