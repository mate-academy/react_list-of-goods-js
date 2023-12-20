import { Good } from '../Good';

export const GoodsList = ({ goods }) => (

  <ul>
    {goods.map(good => (
      <Good key={good} good={good} />
    ))}
  </ul>
);
