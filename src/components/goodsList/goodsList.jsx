import { GoodItem } from '../goodItem/goodItem';

export const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodItem good={good} key={good} />
    ))}
  </ul>
);
