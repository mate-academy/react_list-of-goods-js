import './GoodList.scss';
import { GoodCard } from '../GoodCard/GoodCard';

export const GoodList = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      <GoodCard
        key={good.id}
        good={good}
      />
    ))}
  </ul>
);
