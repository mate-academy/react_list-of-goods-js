import { GoodCard } from '../GoodCard';

export const GoodList = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);
