import { Good } from './Good';

export const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <Good good={good} key={good} />
    ))}
  </ul>
);
