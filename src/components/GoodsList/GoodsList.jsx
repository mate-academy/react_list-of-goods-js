import { GoodCard } from '../GoodCard/GoodCard';

export const GoodsList = ({ goods }) => {
  return goods.map(good => <GoodCard good={good} />);
};
