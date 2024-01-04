import { GoodInfo } from '../GoodInfo';

export const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => <GoodInfo good={good} />)}
  </ul>
);
