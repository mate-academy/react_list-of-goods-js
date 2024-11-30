import { GoodItem } from '../GoodItem/GoodItem';

export const GoodList = ({ goods }) => {
  return (
    <ul className="GoodList">
      {goods.map(good => (
        <GoodItem key={good} good={good} />
      ))}
    </ul>
  );
};
