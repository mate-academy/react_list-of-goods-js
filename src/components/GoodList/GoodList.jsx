import { GoodItem } from '../GoodItem/GoodItem';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodItem good={good} key={good} />
    ))}
  </ul>
);
