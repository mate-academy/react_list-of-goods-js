import { GoodCard } from '../GoodCard/GoodCard';

export const GoodsList = ({ goods }) =>
  goods.map(good => <GoodCard good={good} key={good} />);
