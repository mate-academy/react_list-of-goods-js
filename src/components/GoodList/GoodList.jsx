import { GoodCard } from '../GoodCard';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map((good, index) => (
      <GoodCard good={good} />
    ))}
  </ul>
);
