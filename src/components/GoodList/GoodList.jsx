import { GoodCard } from '../GoodCard';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard good={good} key={good}/>
    ))}
  </ul>
);
