import { GoodItem } from '../GoodItem/GoodItem';

export const GoodList = ({ goods }) => {
  return goods.map(product => <GoodItem product={product} key={product} />);
};
