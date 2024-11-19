import { GoodInfo } from './GoodInfo';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodInfo key={good} good={good} />
    ))}
  </ul>
);
