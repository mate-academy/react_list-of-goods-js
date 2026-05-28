import { GoodItem } from '../GoodItem/GoodItem';

export const GoodList = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      <GoodItem good={good} key={good.id} />
    ))}
  </ul>
);
