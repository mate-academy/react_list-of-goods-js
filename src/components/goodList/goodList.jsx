import { GoodCard } from '../goodCard/goodCard';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);
