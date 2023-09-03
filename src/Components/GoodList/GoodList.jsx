import { Good } from '../Good/Good';

export const GoodList = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => <Good key={good} good={good} />)}
  </ul>
);
