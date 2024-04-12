import { Product } from '../Product/Product';

export const Table = ({ goods }) =>
  goods.map(good => <Product good={good} id={good} />);
