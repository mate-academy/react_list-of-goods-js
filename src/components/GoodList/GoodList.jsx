import GoodGard from '../GoodCard/GoodCard';

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodGard good={good} key={good} />
    ))}
  </ul>
);
