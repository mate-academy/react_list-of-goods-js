import { GoodsItem } from '../GoodsItem';

export const GoodsList = ({ goods }) => (
  <ul className="Goodsist">
    {goods.map(good => (
      <GoodsItem key={good} good={good} />
    ))}
  </ul>
);
