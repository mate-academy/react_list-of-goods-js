import { Good } from './Good';

export const GoodList = ({ goods }) => (
  <ul>
    {
      goods.map(good => <Good key={good} good={good} />)
    }
  </ul>
);
