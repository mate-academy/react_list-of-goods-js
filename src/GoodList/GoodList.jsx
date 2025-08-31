import { Good } from '../components/Good';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <Good good={good} key={good} />
    ))}
  </ul>
);
