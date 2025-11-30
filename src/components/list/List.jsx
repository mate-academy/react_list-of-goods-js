import { Item } from '../item/Item';

export const List = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <Item good={good} key={good} />
    ))}
  </ul>
);
