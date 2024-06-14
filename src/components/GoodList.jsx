import { GoodProduct } from './GoodProduct';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodProduct good={good} key={good.id} />
    ))}
  </ul>
);
