import { GoodItem } from './GoodItem';

export const ListOfGoods = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodItem key={good} good={good} />
    ))}
  </ul>
);
