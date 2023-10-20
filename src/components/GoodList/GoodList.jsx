import { GoodCard } from '../GoodCard/GoodCard';

export const GoodList = ({ goods }) => (
  <ul>
    {
    goods.map(good => (
      <GoodCard key={good.id} good={good} />
    ))
    }
  </ul>
);
