import { GoodCard } from '../Goodcard/Goodcard';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);
