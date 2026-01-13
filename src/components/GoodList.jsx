import { GoodCard } from './GoodCard';

export const GoodList = ({ goods }) => {
  return (
    <ul>
      {goods.map((good) => (
        <GoodCard key={good} good={good} />
      ))}
    </ul>
  );
};
