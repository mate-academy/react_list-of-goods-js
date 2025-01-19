import GoodGard from './GoodCard';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodGard good={good} key={good} />
    ))}
  </ul>
);