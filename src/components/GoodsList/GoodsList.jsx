import { GoodCard } from '../GoodCard';

export const GoodsList = ({ goods }) => (
  <ul className="GoodsList">
    {goods.map(good => (
      <GoodCard good={good} key={good.id} />
    ))}
  </ul>
);
