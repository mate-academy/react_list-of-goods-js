import { GoodCard } from '../GoodCard/GoodCard';

export const GoodsList = ({ goods }) => (
  <ul className="GoodsList">
    {goods.map(good => (
      <GoodCard good={good} key={good.id} />
    ))}
  </ul>
);
