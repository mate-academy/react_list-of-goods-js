import { ProductItem } from '../ProductItem';

export const ProductList = ({ goods }) => (
  <ul>
    {goods.map(item => (
      <ProductItem item={item} key={item} />
    ))}
  </ul>
);
