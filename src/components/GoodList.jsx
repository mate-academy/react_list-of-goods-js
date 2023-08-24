import { GoodCard } from './GoodCard/GoodCard';

export const GoodList = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      <GoodCard key={good.id} name={good.name} />
    ))}
  </ul>
);
